const express = require("express");

const router = express.Router();

const chatController = require("../controllers/chatController");

const authMiddleware = require("../middlewares/authMiddleware");

router.get("/chatpage", chatController.getChatPage);

// Get All Messages
router.get("/message", authMiddleware.authenticate, chatController.getMessages);



// Save Message
router.post("/message", authMiddleware.authenticate, chatController.sendMessage);

module.exports = router;