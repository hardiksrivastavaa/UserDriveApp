const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            minlength: [3, "Username must be at least 3 characters long"],
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            minlength: [13, "Email must be at least 13 characters long"],
        },

        password: {
            type: String,
            required: true,
            trim: true,
            minlength: [8, "Password must be at least 8 characters long"],
        },
    },
    { timestamps: true }
); 



const user = mongoose.model("user", userSchema);

module.exports = user;


// This will automatically add createdAt and updatedAt fields
