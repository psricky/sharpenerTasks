const express = require("express");

const chatController = require("../controllers/chatController");

const authMiddleware = require("../middlewares/authMiddleware");

module.exports = (io) => {

    const router = express.Router();

    router.get("/chatpage", chatController.getChatPage);

    // Get All Messages
    router.get("/message", authMiddleware.authenticate, chatController.getMessages);



    // Save Message
    router.post("/message", authMiddleware.authenticate, 
        (req, res) => {
        chatController.sendMessage(req, res, io)
    });

    return router;
};

