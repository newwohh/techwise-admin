const mongoose = require("mongoose");

const DB = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

const dbConnection = () =>
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log("Database connection success!");
    })
    .catch((err) => {
      console.log(err);
    });

module.exports = dbConnection;
