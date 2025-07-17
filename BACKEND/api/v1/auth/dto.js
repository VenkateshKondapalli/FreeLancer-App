const { HandleGenericAPIError } = require("../../../utils/controllerHelper");

const signUpValidator = (req, res, next) => {
  console.log("in signup");
  const { email, password, otp } = req.body;
  try {
    if (!email || !password || !otp) {
      res.status(400).json({
        isSuccess: false,
        message: "Email password and otp required",
        data: {},
      });
      return;
    }
    next();
  } catch (err) {
    HandleGenericAPIError("signUpValidator", res, err);
  }
};

const otpValidator = (req, res, next) => {
  console.log("in validator");
  try {
    console.log("in otp validator");
    const { email } = req.body;
    if (!email) {
      res.status(400).json({
        isSuccess: false,
        message: "Email is required",
        data: {},
      });
      return;
    }

    next();
  } catch (err) {
    HandleGenericAPIError("otpValidator", res, err);
  }
};

const loginValidator = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        isSuccess: false,
        message: "email and password is required",
        data: {},
      });
      return;
    }
    next();
  } catch (err) {
    HandleGenericAPIError("loginValidator", res, err);
  }
};
module.exports = { signUpValidator, otpValidator, loginValidator };
