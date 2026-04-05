const db=require('../utils/db')
const User=require('../models/users');
const { where } = require('sequelize');
const { Bookings } = require('../models');
const Bus = require('../models/buses');

const addEntry=async (req,res)=>{
    try {
        const {name,email}=req.body
        const user=await User.create({

            name:name,
            email:email
        });

        res.status(201).json(user)

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

const getUserBookingsWithBusInfo=async(req,res)=>{
    try {
        const {id}=req.params
        const userBookings= await Bookings.findAll({
            where:{userId: id},
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId', 'busId']
            },
            include:[{model:Bus,attributes:['busNumber']}]
        });
        res.status(200).json(userBookings)
    } catch (error) {
        console.log(error);
        res.status(500).send('Unable to fetch user bookings');
    }
}


module.exports={
    addEntry,
    getUsers,
    deleteUser,
    getUserBookingsWithBusInfo
}