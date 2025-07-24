const express = require("express");
const {
  createProjectController,
  updateProjectController,
  sendAllProjectController,
  registerController,
  sendMyProjectDetails,
} = require("./controller");
const {
  createProjectValidator,
  updateProjectValidator,
  registerValidator,
} = require("./dto");

const projectRouter = express.Router();

projectRouter.post("/", createProjectValidator, createProjectController);
projectRouter.get("/", sendAllProjectController);

projectRouter.get("/myProject", sendMyProjectDetails);

projectRouter.patch("/register", registerValidator, registerController);
module.exports = { projectRouter };

// projectRouter.patch("/", updateProjectValidator, updateProjectController);
