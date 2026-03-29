import "dotenv/config";
import clientPromise from "./app/lib/db.js";

(async () => {
     const client = await clientPromise;
     console.log("DB connected:", client.db().databaseName);
})();