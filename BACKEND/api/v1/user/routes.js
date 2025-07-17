const express = require("express");
const { sendUserBasicInfoController } = require("./controller");

const userRouter = express.Router();

userRouter.use("/", sendUserBasicInfoController);

module.exports = { userRouter };
