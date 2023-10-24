const app = require("./app");
const dotenv = require("dotenv");
const db = require("./db/db");
const connect = require("./db/connection");

db();
connect();

dotenv.config({ path: "./config/config.env" });

const port = 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
