
// //avoire-website\app\lib\db.js
// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// if (!uri) throw new Error("Missing MONGODB_URI");

// let client;
// let clientPromise;

// if (!global._mongoClientPromise) {
//      client = new MongoClient(uri);
//      global._mongoClientPromise = client.connect();
// }

// clientPromise = global._mongoClientPromise;

// export default clientPromise;

// /app/lib/db.js
// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// if (!uri) throw new Error("Missing MONGODB_URI");

// let client;
// let clientPromise;

// if (!global._mongoClientPromise) {
//      client = new MongoClient(uri);
//      global._mongoClientPromise = client.connect();
// }

// clientPromise = global._mongoClientPromise;

// // Named export function for connecting to DB
// export async function connectToDB() {
//      const client = await clientPromise;
//      return client.db("avoire"); // returns default DB from URI
// }

// /app/lib/db.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

if (uri && !global._mongoClientPromise) {
     client = new MongoClient(uri);
     global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

// Export clientPromise directly for Auth.js adapter
export default clientPromise;

// Optional helper to get DB for your custom APIs
export async function connectToDB() {
     if (!uri) {
          throw new Error("Missing MONGODB_URI");
     }
     const client = await clientPromise;
     return client.db("avoire");
}