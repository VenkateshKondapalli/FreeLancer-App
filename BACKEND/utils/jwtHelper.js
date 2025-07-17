const { HandleGenericAPIError } = require("./controllerHelper");
const jwt = require("jsonwebtoken");

const tokenHelper = (res, data) => {
  try {
    const token = jwt.sign(data, process.env.JWT_SECRET);

    res.cookie("authorization", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true,
      samesite: "none", //none for vercel and render for deployment
      httponly: true,
    });
  } catch (err) {
    HandleGenericAPIError("tokenHelper", res, err);
  }
};

const tokenRemover = (res, {}) => {
  try {
    res.cookie("authorization", "", {
      maxAge: 0,
      secure: true,
      samesite: "none", //none for vercel and render for deployment
      httponly: true,
    });
  } catch (err) {
    HandleGenericAPIError("tokenRemover", res, err);
  }
};

module.exports = { tokenHelper, tokenRemover };
