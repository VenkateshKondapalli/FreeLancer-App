const express = require("express");
const { authRouter } = require("./auth/routes");
const { userRouter } = require("./user/routes");
const { userAuthenticationMiddleware } = require("./middleware");
const { projectRouter } = require("./project/routes");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

apiRouter.use(userAuthenticationMiddleware);

apiRouter.use("/users", userRouter);

apiRouter.use("/project", projectRouter);

module.exports = { apiRouter };
