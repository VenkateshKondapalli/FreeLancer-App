const express = require("express");
const {
  createProjectController,
  updateProjectController,
  sendAllProjectController,
} = require("./controller");
const { createProjectValidator, updateProjectValidator } = require("./dto");

const projectRouter = express.Router();

projectRouter.post("/", createProjectValidator, createProjectController);
// projectRouter.patch("/", updateProjectValidator, updateProjectController);
projectRouter.get("/", sendAllProjectController);
module.exports = { projectRouter };
