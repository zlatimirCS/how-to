const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

console.log(uri);

const client = new MongoClient(uri);
const dbname = "test";

const main = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");
    const db = client.db(dbname);
    const collection = db.collection("test");
    const result = await collection.insertOne({ name: "Zlatimir" });
    console.log(result);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    await client.close();
  }
};

main();
