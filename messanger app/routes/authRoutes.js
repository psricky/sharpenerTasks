const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");

// Login Page
router.get("/", authController.getLoginPage);

// Signup Page
router.get("/signupPage", authController.getSignupPage);

// Handle Signup
router.post("/signup", authController.userEntry);

// Handle Login
router.post("/login", authController.userLogin);

module.exports = router;