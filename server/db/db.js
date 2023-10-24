const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const DBUrl =
  "mongodb+srv://nevoznvx:f5ZXQ8qVuALrhW2D@cluster0.xel6yxj.mongodb.net/techwise";

db = () =>
  mongoose
    .connect(DBUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: "admin",
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });

module.exports = db;
