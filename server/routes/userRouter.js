const express = require("express");
const userRouter = express.Router();
const userCOntroller = require("../controller/user.controller");

userRouter.get("/all", userCOntroller.getUserDocuments);

module.exports = userRouter;
