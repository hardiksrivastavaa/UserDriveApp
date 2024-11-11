const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register route
router.get("/register", (req, res) => {
    res.render("register", { errors: [] });
});

router.post(
    "/register",
    body("email").trim().isEmail().isLength({ min: 13 }).withMessage("Email should be a valid email address and at least 13 characters."),
    body("username").trim().isLength({ min: 5 }).withMessage("Username should be at least 5 characters."),
    body("password").trim().isLength({ min: 8 }).withMessage("Password should be at least 8 characters."),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("register", {
                errors: errors.array().map(error => error.msg),
            });
        }

        const { email, username, password } = req.body;

        try {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.render("register", {
                    errors: ["User with this email already exists."],
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);
            await userModel.create({
                email,
                username,
                password: hashPassword,
            });

            res.redirect("/users/login");
        } catch (error) {
            console.error("Registration failed:", error);
            res.render("register", { errors: ["Server error. Registration failed."] });
        }
    }
);

// Login route
router.get("/login", (req, res) => {
    res.render("login", { errors: [] });
});

router.post(
    "/login",
    body("email").trim().isEmail().isLength({ min: 13 }).withMessage("Email should be a valid email address and at least 13 characters."),
    body("password").trim().isLength({ min: 8 }).withMessage("Password should be at least 8 characters."),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("login", {
                errors: errors.array().map(error => error.msg),
            });
        }

        const { email, password } = req.body;

        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.render("login", {
                    errors: ["Username or password is incorrect"],
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.render("login", {
                    errors: ["Username or password is incorrect"],
                });
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                    username: user.username,
                },
                process.env.JWT_SECRET
            );

            res.cookie("token", token);
            res.redirect("/drive");
        } catch (error) {
            console.error("Login failed:", error);
            res.render("login", { errors: ["Server error. Login failed."] });
        }
    }
);

// Logout route
router.get("/logout", (req, res) => {
    try {
        res.clearCookie("token");
        res.redirect("/");
    } catch (error) {
        console.error("Logout failed:", error);
        res.status(500).json({ message: "Logout failed" });
    }
});

module.exports = router;
