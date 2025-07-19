const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImgToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "freelancerApp/users",
    });
    console.log("-------  file uploaded to cloudinary ---------");
    // console.log(result);
    return result;
  } catch (error) {
    console.log("-------  cloudinary file upload error ---------");
    console.error(error);
    console.log("------- ------------------------- ---------");
    throw error;
  }
};

module.exports = { uploadImgToCloudinary };
