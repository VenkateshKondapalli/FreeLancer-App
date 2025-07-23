const { projectModel } = require("../../../models/projectSchema");
const { HandleGenericAPIError } = require("../../../utils/controllerHelper");

const createProjectController = async (req, res) => {
  try {
    const dataObj = req.body;
    if (!dataObj?.title || !dataObj?.description) {
      return res.status(400).json({
        isSuccess: false,
        message: "Missing required fields: title or description",
        data: {},
      });
    }
    const createdProject = await projectModel.create(dataObj);
    return res.status(201).json({
      isSuccess: true,
      message: "Project created successfully",
      data: createdProject,
    });
  } catch (err) {
    HandleGenericAPIError("createProjectController", res, err);
  }
};

const updateProjectController = async (req, res) => {
  //   try {
  //     const dataObj = req.body;
  //     // const { userId: _id } = req.user;
  //     // const updatedData = await projectModel.findByIdAndUpdate(userId, dataObj);
  //     res.status(201).json({
  //       isSuccess: true,
  //       message: "project details updated",
  //       data: updatedData,
  //     });
  //   } catch (err) {
  //     HandleGenericAPIError("updateProjectController", res, err);
  //   }
};

const sendAllProjectController = async (req, res) => {
  try {
    const allData = await projectModel.find();

    if (!allData || allData.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "No projects found",
        data: [],
      });
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Projects fetched successfully",
      data: allData,
    });
  } catch (err) {
    HandleGenericAPIError("sendAllProjectController", res, err);
  }
};

module.exports = {
  createProjectController,
  updateProjectController,
  sendAllProjectController,
};
