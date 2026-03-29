const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rimshaarfeen61_db_user:KYBXx9Ax7NQSJ5V2@avoire.qd2ju1n.mongodb.net/?appName=avoire";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('avoire');
    const products = database.collection('products');
    
    const allProducts = await products.find({}, { projection: { name: 1, price: 1, type: 1, slug: 1 } }).toArray();
    allProducts.forEach(p => {
      console.log(`${p.name} (${p.slug}): ${p.price} PKR - ${p.type}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
