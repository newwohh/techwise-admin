const express = require("express");

const authController = require("../controller/auth.controller.js");

const authRouter = express.Router();

authRouter.post("/newadmin", authController.newadmin);
authRouter.post("/loginadmin", authController.loginadmin);
authRouter.delete("/deleteadmin", authController.deleteadmin);

module.exports = authRouter;
