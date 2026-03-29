const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://rimshaarfeen61_db_user:KYBXx9Ax7NQSJ5V2@avoire.qd2ju1n.mongodb.net/?appName=avoire";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    
    for (const dbInfo of dbs.databases) {
      const dbName = dbInfo.name;
      if (dbName === 'admin' || dbName === 'local' || dbName === 'config') continue;
      
      const database = client.db(dbName);
      const collections = await database.listCollections().toArray();
      
      for (const collInfo of collections) {
        const collName = collInfo.name;
        const collection = database.collection(collName);
        const count = await collection.countDocuments();
        console.log(`Database: ${dbName}, Collection: ${collName}, Count: ${count}`);
        
        if (count > 0) {
          const docs = await collection.find({}).limit(10).toArray();
          docs.forEach(doc => {
            console.log(`- Sample: ${JSON.stringify(doc).substring(0, 100)}...`);
          });
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
