const express = require("express");
const {
  userSignupContoller,
  setOtpContoller,
  userLoginController,
  logoutController,
} = require("./controller");
const { signUpValidator, otpValidator, loginValidator } = require("./dto");

const authRouter = express.Router();
//signup
authRouter.post("/signup", signUpValidator, userSignupContoller);
authRouter.post("/send-otp", otpValidator, setOtpContoller);
//login
authRouter.post("/login", loginValidator, userLoginController);
authRouter.get("/logout", logoutController);

module.exports = { authRouter };
