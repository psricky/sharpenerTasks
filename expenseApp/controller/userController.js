const NewUsers = require("../models/user");

const userEntry= async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Fields are mandatory"
            })
        }
        const user=await NewUsers.findOne({
            where:{
                email:email
            }
        })
        if(user){
            return res.status(409).json({
                success: false,
                message: "user already exists"
            })
        }
        const newEntry=await NewUsers.create({username,email,password});
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newEntry
        })

    } catch (error) {
        console.log(error)        
        return res.status(500).json({
            success: false,
            message: "internal server error"
        });
    }
}

const userLogin=async (req,res)=>{
    try {
        const {email,password}=req.body;
        if( !email || !password ){
            return res.status(400).json({
                success: false,
                message: "Fields are mandatory"
            })
        }
        const user=await NewUsers.findOne({
            where:{
                email:email,
                password:password
            }
        })
        if(!user){
            return res.status(404).send('Invalid user or password')
        }else{
           return res.status(200).json({
            message:'User logged in successfully',
            success:true
           }) 
        }

    } catch (error) {
        console.log(error)        
        return res.status(500).json({
            success: false,
            message: "internal server error"
        });
    }
}
module.exports={
    userEntry,
    userLogin
}