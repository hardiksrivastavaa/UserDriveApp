// const mongoose = require("mongoose");

// function connectToDB() {
//     mongoose.connect(process.env.MONGO_URI).then(() => {
//         console.log("Connected to DB");
//     });
// }

// module.exports = connectToDB;



const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit the process if unable to connect to DB
  }
};

module.exports = connectToDB;
