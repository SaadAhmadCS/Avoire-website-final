const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://rimshaarfeen61_db_user:KYBXx9Ax7NQSJ5V2@avoire.qd2ju1n.mongodb.net/?appName=avoire";
const client = new MongoClient(uri);

const updates = [
  { id: "65f1a1a00100000000000001", name: "NOCTURA BLACK", slug: "noctura-black", price: 2799 },
  { id: "65f1a1a00100000000000002", name: "VERDE SILVER", slug: "verde-silver", price: 2999 },
  { id: "65f1a1a00100000000000003", name: "VELOURA BLOOM", slug: "veloura-bloom", price: 2799 },
  { id: "65f1a1a00100000000000004", name: "ETERNAL OUD", slug: "eternal-oud", price: 2799 },
  { id: "65f1a1a00100000000000005", name: "AZURE LEGEND", slug: "azure-legend", price: 2999 },
  { id: "65f1a1a00100000000000006", name: "LUMINE ROMANCE", slug: "lumine-romance", price: 2799 }
];

const newProducts = [
  {
    name: "LIBRE ESSENCE",
    slug: "libre-essence",
    price: 2799,
    shortDescription: "A bold, freedom-inspired fragrance.",
    description: "Libre Essence captures the spirit of independence with a sophisticated blend of fresh and deep notes, perfect for a modern statement.",
    images: ["prod1.jpg"], // Placeholder image
    stock: 20,
    category: "fresh",
    notes: ["bergamot", "lavender", "amber"],
    createdAt: new Date()
  },
  {
    name: "INFINITE NOIR",
    slug: "infinite-noir",
    price: 2799,
    shortDescription: " Timeless, mysterious, and deep.",
    description: "Infinite Noir is a profound journey into the night, featuring dark woody undertones and a lingering musky presence.",
    images: ["prod2.jpg"], // Placeholder image
    stock: 15,
    category: "musk",
    notes: ["black pepper", "sandalwood", "musk"],
    createdAt: new Date()
  }
];

async function run() {
  try {
    await client.connect();
    const database = client.db('avoire');
    const products = database.collection('products');
    
    // Update existing products
    for (const update of updates) {
      const result = await products.updateOne(
        { _id: new ObjectId(update.id) },
        { 
          $set: { 
            name: update.name, 
            slug: update.slug, 
            price: update.price 
          } 
        }
      );
      console.log(`Updated ${update.name}: ${result.modifiedCount} document(s) matched.`);
    }
    
    // Add new products
    const result = await products.insertMany(newProducts);
    console.log(`${result.insertedCount} new products inserted.`);
    
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
