const NewUsers = require("../models/user");
const bcrypt = require('bcrypt')
const userEntry = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fields are mandatory"
            })
        }

        const user = await NewUsers.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            return res.status(409).json({
                success: false,
                message: "user already exists"
            })
        }

        const saltrounds = 10
        const hash= await bcrypt.hash(password, saltrounds);
            const newEntry = await NewUsers.create({ 
                username: username, email: email, password: hash 
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
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fields are mandatory"
            })
        }
        const user = await NewUsers.findOne({
            where: {
                email: email
            }
        })
        if(!user) return res.status(404).json({
            success: false,
            message: 'User not found'
        })
        const result=await bcrypt.compare(password, user.password);
        if (!result) {
            res.status(401).json({
                success: false,
                message: "Invalid password"
            })
            }
            
            return res.status(200).json({
                    success: true,
                    message: 'User logged in successfully'
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
    userLogin
}