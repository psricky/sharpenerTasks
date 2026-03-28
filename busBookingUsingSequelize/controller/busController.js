const db=require('../utils/db')
const Bus=require('../models/buses')
const {Op}=require('sequelize')

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

module.exports={
    addBus,
    getBusesGreaterThanSpecifiedSeats
}