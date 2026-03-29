

//app\api\user\update\route.js
import { connectToDB } from "@/app/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
     const session = await getServerSession(authOptions);
     if (!session) return new Response("Unauthorized", { status: 401 });

     const data = await req.json();
     const db = await connectToDB();

     await db.collection("users").updateOne(
          { email: session.user.email },
          { $set: { ...data } }
     );

     return new Response(JSON.stringify({ success: true }));
}