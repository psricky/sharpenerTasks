const User = require("../models/user");

const userEntry= async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        const newEntry=await User.create({username,email,password});
        return res.status(201).json(newEntry)

    } catch (error) {
        console.log(error)        
        res.status(500).json({error:"Failed to create user"});
    }
}

module.exports={
    userEntry
}