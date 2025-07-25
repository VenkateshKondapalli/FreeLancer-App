const { uploadImgToCloudinary } = require("../../../config/cloudnary");
const { clientModel } = require("../../../models/clientSchema");
const { freelancerModel } = require("../../../models/freeLancerSchema");
const { HandleGenericAPIError } = require("../../../utils/controllerHelper");

const sendUserBasicInfoController = async (req, res) => {
  const userInfo = req.user;
  const { role, email } = userInfo;
  let name;

  if (role === "freelancer") {
    const freelancer = await freelancerModel
      .findOne({ email })
      .select("fullName");
    // console.log(freelancer);
    name = freelancer?.fullName;
  } else if (role === "client") {
    const client = await clientModel.findOne({ email }).select("fullName");
    name = client?.fullName;
    // console.log(name);
  } else {
    return res.status(400).json({
      isSuccess: false,
      message: "Invalid role",
      data: {},
    });
  }
  // console.log(name);
  res.status(200).json({
    isSuccess: true,
    message: "user is valid",
    data: {
      userInfo,
      name,
    },
  });
};

const sentUserInformation = async (req, res) => {
  try {
    const { email, role } = req.user;
    let userData;

    if (role === "freelancer") {
      userData = await freelancerModel.findOne({ email });
    } else {
      userData = await clientModel.findOne({ email });
    }

    if (!userData) {
      return res.status(400).json({
        isSuccess: false,
        message: "User has not created a profile",
        data: {},
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "User data fetched successfully",
      data: userData,
    });
  } catch (err) {
    HandleGenericAPIError("sentUserInformation", res, err);
  }
};

const createProfileDataController = async (req, res) => {
  try {
    const dataObj = req.body;
    const { role } = req.user;
    let createdUser;

    if (role === "freelancer") {
      createdUser = await freelancerModel.create(dataObj);
    } else if (role === "client") {
      createdUser = await clientModel.create(dataObj);
    } else {
      return res.status(400).json({
        isSuccess: false,
        message: "Invalid user role",
        data: {},
      });
    }

    return res.status(201).json({
      isSuccess: true,
      message: "User profile created successfully",
      data: createdUser,
    });
  } catch (err) {
    HandleGenericAPIError("createProfileDataController", res, err);
  }
};

const updateProfileController = async (req, res) => {
  try {
    const bodyObj = req.body;
    const { email, role } = req.user;

    let existedUser;
    let updatedData;

    if (role === "freelancer") {
      existedUser = await freelancerModel.findOne({ email });
      if (!existedUser) {
        return res.status(404).json({
          isSuccess: false,
          message: "Freelancer profile not found",
          data: {},
        });
      }
      updatedData = await freelancerModel.findByIdAndUpdate(
        existedUser._id,
        bodyObj,
        { new: true, runValidators: true }
      );
    } else if (role === "client") {
      existedUser = await clientModel.findOne({ email });
      if (!existedUser) {
        return res.status(404).json({
          isSuccess: false,
          message: "Client profile not found",
          data: {},
        });
      }
      updatedData = await clientModel.findByIdAndUpdate(
        existedUser._id,
        bodyObj,
        { new: true, runValidators: true }
      );
    } else {
      return res.status(400).json({
        isSuccess: false,
        message: "Invalid user role",
        data: {},
      });
    }

    return res.status(200).json({
      isSuccess: true,
      message: "User profile updated successfully",
      data: updatedData,
    });
  } catch (err) {
    HandleGenericAPIError("updateProfileController", res, err);
  }
};

const uploadDPController = async (req, res) => {
  const uploadedFile = await uploadImgToCloudinary(req.file.path);
  console.log(uploadedFile);
  const { role, email } = req.user;
  let userData;
  if (role === "freelancer") {
    userData = await freelancerModel.findOne({ email });
    const { _id: userId } = userData;
    await freelancerModel.findByIdAndUpdate(userId, {
      imageUrl: uploadedFile.url,
    });
  } else if (role === "client") {
    userData = await clientModel.findOne({ email });
    const { _id: userId } = userData;
    await clientModel.findByIdAndUpdate(userId, {
      imageUrl: uploadedFile.url,
    });
  } else {
    return res.status(400).json({
      isSuccess: false,
      message: "Invalid user role",
      data: {},
    });
  }
  res.status(201).json({
    isSuccess: true,
    message: "file uploaded",
    data: {
      imageUrl: uploadedFile.url,
    },
  });
};

module.exports = {
  sendUserBasicInfoController,
  createProfileDataController,
  sentUserInformation,
  updateProfileController,
  uploadDPController,
};
