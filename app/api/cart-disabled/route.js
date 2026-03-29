

//cart/route.js
// import { connectToDB } from "@/app/utils/mongodb";

// export async function POST(req) {
//      try {
//           const db = await connectToDB();
//           const data = await req.json(); // cart items from frontend
//           const result = await db.collection('carts').insertOne(data);
//           return new Response(JSON.stringify({ success: true, id: result.insertedId }), {
//                status: 200,
//           });
//      } catch (err) {
//           console.error(err);
//           return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
//      }
// }