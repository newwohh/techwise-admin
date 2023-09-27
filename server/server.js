const app = require("./app");
const dbConnection = require("./db/connection");

dbConnection();

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
