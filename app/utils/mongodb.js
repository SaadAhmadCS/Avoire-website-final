
// //D: \avoire - website\app\utils\mongodb.js
// import { MongoClient } from 'mongodb';

// let client;
// let clientPromise;

// const uri = process.env.MONGODB_URI; // from .env.local
// const options = {};

// if (!process.env.MONGODB_URI) {
//      throw new Error('Please add your Mongo URI to .env.local');
// }

// if (process.env.NODE_ENV === 'development') {
//      // Global for dev to prevent multiple connections
//      if (!global._mongoClientPromise) {
//           client = new MongoClient(uri, options);
//           global._mongoClientPromise = client.connect();
//      }
//      clientPromise = global._mongoClientPromise;
// } else {
//      // Production
//      client = new MongoClient(uri, options);
//      clientPromise = client.connect();
// }

// export async function connectToDB() {
//      const client = await clientPromise;
//      const db = client.db('avoire'); // your DB name
//      return db;
// }