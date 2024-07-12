const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
  if (!localFilePath) return;
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(localFilePath, {
      //   public_id: "avatar",
      asset_folder: "textin",
      resource_type: "auto",
    })
    .catch((error) => {
      fs.unlinkSync(localFilePath);
      console.log(error);
    });
  fs.unlinkSync(localFilePath);
  return uploadResult.url;
};

module.exports = { uploadToCloudinary };
