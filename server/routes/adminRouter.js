const express = require("express");

const authController = require("../controller/auth.controller.js");

const authRouter = express.Router();

authRouter.post("/newadmin", authController.newadmin);

module.exports = authRouter;
