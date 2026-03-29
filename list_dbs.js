const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rimshaarfeen61_db_user:KYBXx9Ax7NQSJ5V2@avoire.qd2ju1n.mongodb.net/?appName=avoire";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    console.log(JSON.stringify(dbs.databases.map(db => db.name), null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
