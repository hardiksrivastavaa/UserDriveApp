const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Load environment variables from .env file
require('dotenv').config();


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'filesharing_drive',
        allowedFormats: ["png", "jpg", "jpeg", "pdf"],
        unique: true,
    },
});

module.exports = {
    cloudinary,
    storage,
};