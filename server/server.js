const app = require("./app");
const dotenv = require("dotenv");
const db = require("./db/db");

db();

dotenv.config({ path: "./config/config.env" });

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
