const express = require("express");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  sendUserBasicInfoController,
  sentUserInformation,
  updateProfileController,
  createProfileDataController,
  uploadDPController,
} = require("./controller");
const { updateProfileValidator, profileDataValidator } = require("./dto");

const userRouter = express.Router();

userRouter.get("/", sendUserBasicInfoController);

userRouter.get("/details", sentUserInformation);

userRouter.post("/profile", profileDataValidator, createProfileDataController);

userRouter.patch("/profile", updateProfileValidator, updateProfileController);

userRouter.put(
  "/display-picture",
  upload.single("displayPicture"),
  uploadDPController
);

module.exports = { userRouter };
