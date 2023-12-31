const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/adminRouter");
const sellerRouter = require("./routes/sellerRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
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

// routes
app.use("/techwise/api/auth", authRouter);
app.use("/techwise/api/user", userRouter);
app.use("/techwise/api/seller", sellerRouter);
app.use("/techwise/api/product", productRouter);
app.use("/", (req, res) => {
  res.json({ message: "Hey , Welcome to Techwise admin" });
});

module.exports = app;
