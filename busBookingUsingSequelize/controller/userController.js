const db=require('../utils/db')
const User=require('../models/users');
const { where } = require('sequelize');

const addEntry=async (req,res)=>{
    try {
        const {name,email}=req.body
        const user=await User.create({

            name:name,
            email:email
        });

        res.status(201).send(`User with name ${name} created`)

    }catch(error){
        console.log(error)
        res.status(500).send('Unable to make an entry')
    }
    
}

const getUsers=async(req,res)=>{
    try {
        const users=await User.findAll();
        if(users.length===0){
            return res.status(404).send('User not found')
        }
        return res.status(201).json(users)

    } catch (error) {
        console.log(error);
        return res.status(500).send('Users cannot be fetched');
    }
}

const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params
        const deletedUser=await User.destroy({
            where:{id:id}
        });
            
        if(!deletedUser){
            return res.status(404).send('User not found')
        }
        return res.status(201).send('User deleted')
    } catch (error) {
        console.log(error);
        return res.status(500).send('Users cannot be deleted');
    }
}
module.exports={
    addEntry,
    getUsers,
    deleteUser
}