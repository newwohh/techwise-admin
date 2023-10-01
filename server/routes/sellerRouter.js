const express = require("express");
const sellerController = require("../controller/seller.controller");

const sellerRouter = express.Router();

sellerRouter.get("/all", sellerController.getSeller);
sellerRouter.put("/ban", sellerController.banSeller);
sellerRouter.post("/new", sellerController.createSeller);
sellerRouter.put("/unban", sellerController.unbanSeller);
sellerRouter.delete("/delete", sellerController.deleteSeller);
sellerRouter.get("/stats", sellerController.getSellerStats);

module.exports = sellerRouter;
