const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'Uploads',
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = uploadImage;
