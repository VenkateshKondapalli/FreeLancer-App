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

const registerController = async (req, res) => {
  try {
    const { id, name: freelancerName } = req.body;

    const updatedData = await projectModel.findByIdAndUpdate(
      id,
      { freelancerName },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({
        isSuccess: false,
        message: "Project not found",
        data: {},
      });
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Registered successfully",
      data: updatedData,
    });
  } catch (err) {
    HandleGenericAPIError("registerController", res, err);
  }
};

const sendMyProjectDetails = async (req, res) => {
  const { name, role } = req.body;
  let userProject;
  if (role === "client") {
    userProject = await projectModel.find({ clientName: name });
  } else if (role === "freelancer") {
    userProject = await projectModel.find({ freelancerName: name });
  } else {
    return res.status(400).json({
      isSuccess: false,
      message: "role needs to be client or freelancer",
      data: {},
    });
  }

  if (!userProject) {
    return res.status(400).json({
      isSuccess: false,
      message: "no project found or no project registered",
      data: {},
    });
  }

  res.status(200).json({
    isSuccess: true,
    message: "user project data fetched succesfully ",
    data: userProject,
  });
};

module.exports = {
  createProjectController,
  updateProjectController,
  sendAllProjectController,
  registerController,
  sendMyProjectDetails,
};
