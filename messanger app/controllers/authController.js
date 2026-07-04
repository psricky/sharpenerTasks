const path = require("path");

const User = require("../models/User");

const { Op } = require("sequelize");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


// ===============================
// Display Login Page
// ===============================

exports.getLoginPage = (req, res) => {

    res.sendFile(path.join(__dirname, "../public/login.html"));

};


// ===============================
// Display Signup Page
// ===============================

exports.getSignupPage = (req, res) => {

    res.sendFile(path.join(__dirname, "../public/signup.html"));

};

exports.getProfile = (req, res) => {

    res.status(200).json({

        success: true,

        message: "Welcome",

        user: req.user

    });

};

// ===============================
// Signup Controller
// ===============================

exports.signup = async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;

        // Check if all fields are entered
        if (!name || !email || !phone || !password) {

            return res.status(400).json({

                success: false,

                message: "Please fill all fields."

            });

        }

        // Check if email already exists
        const existingEmail = await User.findOne({

            where: {

                email: email

            }

        });

        if (existingEmail) {

            return res.status(400).json({

                success: false,

                message: "Email already exists."

            });

        }

        // Check if phone already exists
        const existingPhone = await User.findOne({

            where: {

                phone: phone

            }

        });

        if (existingPhone) {

            return res.status(400).json({

                success: false,

                message: "Phone number already exists."

            });

        }

        // Save user
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({

            name,

            email,

            phone,

            password: hashedPassword

        });

        res.status(201).json({

            success: true,

            message: "Account created successfully."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};


// ===============================
// Login Controller
// ===============================

exports.login = async (req, res) => {

    try {

        const { emailOrPhone, password } = req.body;

        if (!emailOrPhone || !password) {

            return res.status(400).json({

                success: false,

                message: "Please enter all fields."

            });

        }

        // Find user by email OR phone
        const user = await User.findOne({

            where: {

                [Op.or]: [

                    { email: emailOrPhone },

                    { phone: emailOrPhone }

                ]

            }

        });

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {

            return res.status(401).json({

                success: false,

                message: "Incorrect password."

            });

        }

        const token = jwt.sign(

            {

                id: user.id,

                email: user.email

            },

            "mySecretKey",

            {

                expiresIn: "1h"

            }

        );

        res.status(200).json({

            success: true,

            message: "Login Successful.",

            token: token

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};