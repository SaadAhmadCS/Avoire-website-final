

// D:\avoire-website\app\models\product.js
import { connectToDB } from "../lib/db";


export async function getProducts() {
     const db = await connectToDB(); // returns the DB instance
     return db.collection("products").find({}).toArray();
}

export async function getProductBySlug(slug) {
     const db = await connectToDB();
     return db.collection("products").findOne({ slug });
}