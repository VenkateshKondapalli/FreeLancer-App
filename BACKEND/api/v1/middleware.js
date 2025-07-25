const jwt = require("jsonwebtoken");
const { HandleGenericAPIError } = require("../../utils/controllerHelper");

const userAuthenticationMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies.authorization || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        isSuccess: false,
        message: "Token not found",
        data: {},
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
      // console.log(decodedData);
      if (err) {
        return res.status(401).json({
          isSuccess: false,
          message: "Invalid token!",
          data: {},
        });
      }

      req.user = decodedData;
      next();
    });
  } catch (err) {
    HandleGenericAPIError("userAuthenticationMiddleware", res, err);
  }
};

module.exports = { userAuthenticationMiddleware };
