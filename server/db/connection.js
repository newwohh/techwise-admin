const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const { MongoClient } = require("mongodb");

const DBUrl =
  "mongodb+srv://nevoznvx:f5ZXQ8qVuALrhW2D@cluster0.xel6yxj.mongodb.net/";

const dbName = "techwise";
// const dbName = process.env.DATABASE;
const client = new MongoClient(DBUrl);

async function connect() {
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log("Connected to MongoDB Client");

    const collection = db.collection("users");
    return collection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = connect;
