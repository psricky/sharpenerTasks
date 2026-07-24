const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require("path");
const { Op } = require("sequelize");
const getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
}
const getSignupPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
}
const userEntry = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Fields are mandatory"
            })
        }

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { phone: phone }
                ]
            }
        })
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "user already exists"
            })
        }

        const saltrounds = 10
        const hash = await bcrypt.hash(password, saltrounds);
        const newEntry = await User.create({
             name: name, email: email, phone: phone, password: hash
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "internal server error"
        });
    }
}


const userLogin = async (req, res) => {
    try {
        const { emailorphone, password } = req.body;
        if (!emailorphone || !password) {
            return res.status(400).json({
                success: false,
                message: "Fields are mandatory"
            })
        }
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: emailorphone },
                    { phone: emailorphone }
                ]
            }
        })
        if (!user) return res.status(404).json({
            success: false,
            message: 'User not found'
        })
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }
        const token= jwt.sign( 
        {
           userId: user.id
        }, 
        process.env.JWT_SECRET_KEY, 
        { 
            expiresIn: '1h' 
        }
        );
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token: token,
            user: user
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "internal server error"
        });
    }
}



module.exports = {
    userEntry,
    userLogin,
    getLoginPage,
    getSignupPage
}