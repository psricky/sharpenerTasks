const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");

// Login Page
router.get("/", authController.getLoginPage);

// Signup Page
router.get("/signup", authController.getSignupPage);

router.get(

    "/profile",

    authMiddleware,

    authController.getProfile

);

// Handle Signup
router.post("/signup", authController.signup);

// Handle Login
router.post("/login", authController.login);

module.exports = router;