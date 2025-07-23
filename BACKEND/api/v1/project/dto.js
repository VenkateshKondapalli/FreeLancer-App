const { HandleGenericAPIError } = require("../../../utils/controllerHelper");

const createProjectValidator = (req, res, next) => {
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
    HandleGenericAPIError("createProjectValidator", res, err);
  }
};

const updateProjectValidator = (req, res, next) => {
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
    HandleGenericAPIError("updateProjectValidator", res, err);
  }
};

module.exports = { createProjectValidator, updateProjectValidator };
