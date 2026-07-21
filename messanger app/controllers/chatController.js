const Message = require("../models/Message");

const User = require("../models/User");

const path = require("path");

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

        res.status(201).json({

            success: true,

            message: newMessage

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

        const messages = await Message.findAll({

            include: [

                {

                    model: User,

                    attributes: ["id", "name"]

                }

            ],

            order: [

                ["createdAt", "ASC"]

            ]

        });

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
