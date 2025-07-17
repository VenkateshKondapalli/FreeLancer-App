const express = require("express");
const {
  sendUserBasicInfoController,
  sentUserInformation,
  updateProfileController,
  createProfileDataController,
} = require("./controller");
const { updateProfileValidator, profileDataValidator } = require("./dto");

const userRouter = express.Router();

userRouter.get("/", sendUserBasicInfoController);

userRouter.get("/details", sentUserInformation);

userRouter.post("/profile", profileDataValidator, createProfileDataController);

userRouter.patch("/profile", updateProfileValidator, updateProfileController);

module.exports = { userRouter };
