const { HandleGenericAPIError } = require("../../../utils/controllerHelper");

const profileDataValidator = (req, res, next) => {
  try {
    const data = req.body;
    if (!data) {
      res.status(400).json({
        isSuccess: false,
        message: "please fill the data",
        data: {},
      });
      return;
    }
    next();
  } catch (err) {
    HandleGenericAPIError("profileDataValidator", res, err);
  }
};

const updateProfileValidator = (req, res, next) => {
  try {
    const data = req.body;
    if (!data) {
      res.status(400).json({
        isSuccess: false,
        message: "please fill the data",
        data: {},
      });
      return;
    }
    next();
  } catch (err) {
    HandleGenericAPIError("updateProfileValidator", res, next);
  }
};

module.exports = { profileDataValidator, updateProfileValidator };
