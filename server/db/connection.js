const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const { MongoClient } = require("mongodb");

const DBUrl = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
const dbName = process.env.DATABASE;
const client = new MongoClient(DBUrl);

async function connect() {
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log("Connected to MongoDB");

    const collection = db.collection("user");

    return collection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = connect;
