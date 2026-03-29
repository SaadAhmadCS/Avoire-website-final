const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rimshaarfeen61_db_user:KYBXx9Ax7NQSJ5V2@avoire.qd2ju1n.mongodb.net/?appName=avoire";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const dbs = ['avoire', 'test', 'contactDB'];
    for (const dbName of dbs) {
      const database = client.db(dbName);
      const collections = await database.listCollections().toArray();
      for (const coll of collections) {
         if (coll.name.includes('product')) {
            const products = await database.collection(coll.name).find({}).toArray();
            console.log(`DB: ${dbName}, Coll: ${coll.name}, Count: ${products.length}`);
            products.forEach(p => console.log(`  - ${p.name || p.title}: ${p.price}`));
         }
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
