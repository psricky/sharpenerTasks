const db=require('../config/db');
const User=require('../models/userModel');
const addUserDetails= async(req,res)=>{
    try {
        const {name,email}=req.body;
        if(!name || !email){
            return res.status(400).json({ error: 'Name and email are required' });
        }
        const user=await User.create({
            name,
            email
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const getAllUsers=async(req,res)=>{
    try {
        const users=await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.findByPk(id);
        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports={
    createUser:addUserDetails,
    getAllUsers:getAllUsers,
    deleteUser:deleteUser
}