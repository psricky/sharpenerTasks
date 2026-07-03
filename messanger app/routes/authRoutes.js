const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

// Login Page
router.get("/", authController.getLoginPage);

// Signup Page
router.get("/signup", authController.getSignupPage);

// Handle Signup
router.post("/signup", authController.signup);

// Handle Login
router.post("/login", authController.login);

module.exports = router;