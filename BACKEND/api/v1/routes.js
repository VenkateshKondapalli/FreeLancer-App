const express = require("express");
const { authRouter } = require("./auth/routes");
const { userRouter } = require("./user/routes");
const { userAuthenticationMiddleware } = require("./middleware");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

apiRouter.use(userAuthenticationMiddleware);

apiRouter.use("/users", userRouter);

module.exports = { apiRouter };
