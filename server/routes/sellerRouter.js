const express = require("express");
const sellerController = require("../controller/seller.controller");

const sellerRouter = express.Router();

sellerRouter.get("/all", sellerController.getSeller);
sellerRouter.post("/new", sellerController.createSeller);
sellerRouter.delete("/delete", sellerController.deleteSeller);

module.exports = sellerRouter;
