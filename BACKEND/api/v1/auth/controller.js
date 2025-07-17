const { otpModel } = require("../../../models/otpSchema");
const { UserModel } = require("../../../models/userSchema");
const { HandleGenericAPIError } = require("../../../utils/controllerHelper");
const { sendOtpMail } = require("../../../utils/emailHelper");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 6);

const bcrypt = require("bcrypt");
const { tokenHelper, tokenRemover } = require("../../../utils/jwtHelper");

const userSignupContoller = async (req, res) => {
  try {
    const { name, role, email, password, otp } = req.body;
    const user = await UserModel.findOne({ email }).lean();
    if (user) {
      res.status(400).json({
        isSuccess: false,
        message: "User is already exist",
        data: {},
      });
      return;
    }

    const sentOtpDoc = await otpModel.findOne({ email }).lean();
    if (!sentOtpDoc) {
      res.status(400).json({
        isSuccess: false,
        message: "resend otp",
        data: {},
      });
    }

    const { otp: hashedotp } = sentOtpDoc;
    const isCorrect = await bcrypt.compare(otp.toString(), hashedotp);
    if (!isCorrect) {
      res.status(400).json({
        isSuccess: false,
        message: "Incorrect otp! Please try again...",
        data: {},
      });
    }

    await UserModel.create({ email, password, name, role });

    res.status(201).json({
      isSuccess: true,
      message: "User is Created",
      data: {},
    });
  } catch (err) {
    HandleGenericAPIError("userSignupContoller", res, err);
  }
};

const setOtpContoller = async (req, res) => {
  try {
    console.log("otp controller");
    const { email } = req.body;

    const otp = nanoid();
    console.log(otp);
    await sendOtpMail(email, otp);

    await otpModel.create({ email, otp });
    res.status(201).json({
      isSuccess: true,
    });
  } catch (err) {
    HandleGenericAPIError("setOtpContoller", res, err);
  }
};

const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(400).json({
      isSuccess: false,
      message: "User does not exist please login!",
      data: {},
    });

    return;
  }
  const { password: hashedPassword } = user;
  const isCorrect = await bcrypt.compare(password.toString(), hashedPassword);

  if (!isCorrect) {
    res.status(400).json({
      isSuccess: false,
      message: "password is incorrect",
      data: {},
    });
    return;
  }

  tokenHelper(res, { email: user.email, _id: user._id, role: user.role });

  res.status(200).json({
    isSuccess: true,
    message: "login succesfull",
    data: {
      user: { email: user.email, _id: user._id, role: user.role },
    },
  });
};

const logoutController = async (req, res) => {
  tokenRemover(res, {});

  res.status(200).json({
    isSuccess: true,
    message: "logout successfull",
    data: {},
  });
};

module.exports = {
  userSignupContoller,
  setOtpContoller,
  userLoginController,
  logoutController,
};
