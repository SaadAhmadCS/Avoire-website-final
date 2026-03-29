
// /app/api/orders/create/route.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/app/lib/db";

export async function POST(req) {
     try {
          // Try to get session, but don't block if not authenticated
          let userId = "guest";
          try {
               const session = await getServerSession(authOptions);
               if (session?.user?.id) {
                    userId = session.user.id;
               } else if (session?.user?.email) {
                    userId = session.user.email;
               }
          } catch (e) {
               // Guest checkout — no session is fine
          }

          const data = await req.json();
          const { items, shippingAddress, total, paymentMethod, paymentScreenshot } = data;

          if (!items || items.length === 0 || !shippingAddress || !total) {
               return new Response(JSON.stringify({ success: false, error: "Missing required fields" }), { status: 400 });
          }

          if (!paymentMethod || !["cod", "bank_transfer"].includes(paymentMethod)) {
               return new Response(JSON.stringify({ success: false, error: "Invalid payment method" }), { status: 400 });
          }

          if (paymentMethod === "bank_transfer" && !paymentScreenshot) {
               return new Response(JSON.stringify({ success: false, error: "Payment screenshot is required for bank transfer" }), { status: 400 });
          }

          const db = await connectToDB();

          const order = {
               userId,
               items: items.map(i => ({
                    productId: i.productId,
                    name: i.name,
                    price: i.price,
                    qty: i.qty || 1
               })),
               total,
               shippingAddress,
               paymentMethod,
               paymentScreenshot: paymentScreenshot || "",
               paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
               orderStatus: "pending",
               createdAt: new Date()
          };

          const result = await db.collection("orders").insertOne(order);

          return new Response(JSON.stringify({ success: true, id: result.insertedId }), { status: 200 });
     } catch (err) {
          console.error("Order creation error:", err);
          return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
     }
}