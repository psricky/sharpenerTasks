const express = require("express");

const router = express.Router();

const chatController = require("../controllers/chatController");

const authMiddleware = require("../middlewares/authMiddleware");



// Get All Messages
router.get(
    "/messages",
    authMiddleware,
    chatController.getMessages
);



// Save Message
router.post(
    "/messages",
    authMiddleware,
    chatController.sendMessage
);

module.exports = router;