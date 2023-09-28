const express = require("express");
const cookieParser = require("cookie-parser");
// const productRouter = require("./routes/productRouter");
const authRouter = require("./routes/adminRouter");
const sellerRouter = require("./routes/sellerRouter");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );

  next();
});

app.use("/techwise/api/auth", authRouter);
app.use("/techwise/api/seller", sellerRouter);

module.exports = app;
