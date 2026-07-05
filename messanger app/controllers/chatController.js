const Message = require("../models/Message");

const User = require("../models/User");


// =====================================
// Send Message
// =====================================

exports.sendMessage = async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {

            return res.status(400).json({

                success: false,

                message: "Message cannot be empty."

            });

        }

        const newMessage = await Message.create({
            message,
            UserId: req.user.id
        });

        const completeMessage = await Message.findByPk(newMessage.id, {
            include: [{
                model: User,
                attributes: ["name"]
            }]
        });

        res.status(201).json({
            success: true,
            data: completeMessage
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


// =====================================
// Get All Messages
// =====================================

exports.getMessages = async (req, res) => {

    try {

        const messages = await Message.findAll({

            include: [

                {

                    model: User,

                    attributes: ["name"]

                }

            ],

            order: [

                ["createdAt", "ASC"]

            ]

        });

        res.status(200).json({

            success: true,

            data: messages

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