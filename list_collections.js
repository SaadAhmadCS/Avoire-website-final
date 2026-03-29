const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rimshaarfeen61_db_user:KYBXx9Ax7NQSJ5V2@avoire.qd2ju1n.mongodb.net/?appName=avoire";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('avoire');
    const collections = await database.listCollections().toArray();
    console.log(JSON.stringify(collections.map(c => c.name), null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
