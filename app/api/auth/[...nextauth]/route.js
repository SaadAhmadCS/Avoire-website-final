

//avoire-website\app\api\auth\[...nextauth]\route.js
// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import { connectToDB } from "@/app/lib/db";

// export const authOptions = {
//      adapter: MongoDBAdapter(connectToDB()),

//      providers: [
//           Google({
//                clientId: process.env.GOOGLE_CLIENT_ID,
//                clientSecret: process.env.GOOGLE_CLIENT_SECRET
//           })
//      ],

//      session: { strategy: "jwt" },

//      secret: process.env.AUTH_SECRET
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// /app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/lib/db"; // <- use clientPromise here

export const authOptions = {
     adapter: MongoDBAdapter(clientPromise), // <- pass clientPromise
     providers: [
          GoogleProvider({
               clientId: process.env.GOOGLE_CLIENT_ID,
               clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
     ],
     session: { strategy: "jwt" },
     callbacks: {
          async signIn({ user }) {
               const db = (await import("@/app/lib/db")).connectToDB();
               const profile = await (await db).collection("users").findOne({ email: user.email });
               if (!profile) {
                    await (await db).collection("users").insertOne({
                         _id: user.id,
                         name: user.name,
                         email: user.email,
                         image: user.image,
                         addresses: [],
                         phone: "",
                         role: "user",
                         createdAt: new Date(),
                    });
               }
               return true;
          },

          async session({ session }) {
               const db = (await import("@/app/lib/db")).connectToDB();
               const profile = await (await db).collection("users").findOne({ email: session.user.email });
               if (profile) session.user.profile = profile;
               return session;
          },
     },
     secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };