const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rimshaarfeen61_db_user:KYBXx9Ax7NQSJ5V2@avoire.qd2ju1n.mongodb.net/?appName=avoire";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('avoire');
    const products = await database.collection('products').find({}).toArray();
    for (const p of products) {
      console.log(`PRODUCT_DATA|ID:${p._id}|NAME:${p.name}|SLUG:${p.slug}|IMAGE:${p.images?.[0]}|PRICE:${p.price}`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
