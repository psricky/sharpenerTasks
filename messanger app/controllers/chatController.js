const socket = require("../socket");

const Message = require("../models/Message");

const User = require("../models/User");

const path = require("path");
const { where } = require("sequelize");

const getChatPage = (req, res) => {

    res.sendFile(path.join(__dirname, "../public/html/chat.html"));

};

const sendMessage = async (req, res) => {

    try {

        const { message } = req.body;

        if (!message || message.trim() === "") {

            return res.status(400).json({

                success: false,

                message: "Message cannot be empty"

            });

        }

        const newMessage = await req.user.createMessage({

            message

        });

        const savedMessage = await Message.findByPk(newMessage.id, {

            include: [

                {

                    model: User,

                    attributes: ["id", "name"]

                }

            ]

        });
        
        socket.getIO().emit("receive-message", savedMessage);
        res.status(201).json({

            success: true,

            message: savedMessage

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            error: err.message

        });

    }

};

const getMessages = async (req, res) => {

    try {

        const messages = await Message.findAll();

        res.status(200).json(messages);

    }

    catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

};
module.exports = {

    getChatPage,
    sendMessage,
    getMessages

};
