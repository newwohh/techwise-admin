const express = require("express");
const productController = require("../controller/product.controller");

const productRouter = express.Router();

productRouter.get("/all", productController.getProducts);
productRouter.post("/new", productController.createProduct);

module.exports = productRouter;
