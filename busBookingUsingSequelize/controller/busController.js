const db=require('../utils/db')
const Bus=require('../models/buses')
const Bookings=require('../models/bookings')    
const User = require('../models/users')

const addBus=async(req,res)=>{
    try {

        const {busNumber,totalSeats,availableSeats}=req.body
        const addBus=await Bus.create({
            busNumber:busNumber,
            totalSeats:totalSeats,
            availableSeats:availableSeats
        });
        if(!addBus){
            return res.status(404).send('Bus not found')
        }
        return res.status(201).send('Bus added')
    } catch (error) {
        console.log(error)
        res.status(500).send('Unable to make an entry')
    }
}

const getBusesGreaterThanSpecifiedSeats=async(req,res)=>{
    try {
        const {seats}=req.params
        const bus=await Bus.findAll({
            where:{
            availableSeats:{
                [Op.gt]:seats
            }
        }
        });
        res.status(200).json(bus)
    } catch (error) {
        console.log(error)
        res.status(500).send('Unable to fetch buses')
    }
}
const deleteBusEntry=async(req,res)=>{
    try {
        const {id}=req.params
        const deletedBus=await Bus.destroy({
            where:{id:id}
        });
        if(!deletedBus){
            return res.status(404).send('Bus not found')
        }
        return res.status(201).send('Bus deleted')
    } catch (error) {
        console.log(error)
        res.status(500).send('Unable to delete bus entry')
    }
}

const getBusBookingsWithUserInfo=async(req,res)=>{
    try {
        const {id}=req.params
        const userBookings= await Bookings.findAll({
            where:{busId: id},
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId', 'busId']
            },
            include:[{model:User,attributes:['name','email']}]
        });
        res.status(200).json(userBookings)
    } catch (error) {
        console.log(error);
        res.status(500).send('Unable to fetch bus bookings');
    }
}

module.exports={
    addBus,
    getBusesGreaterThanSpecifiedSeats,
    deleteBusEntry,
    getBusBookingsWithUserInfo
}