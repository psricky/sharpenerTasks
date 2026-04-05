const User=require('../models/users')
const Bus=require('../models/buses')
const Bookings  = require('../models/bookings');

const addBooking=async (req,res)=>{
    try {
        const {userId,busId,seatNumber}=req.body
        const user=await User.findByPk(userId)
        if(!user){
            return res.status(404).send('User not found')
        }
        const bus=await Bus.findByPk(busId)
        if(bus.availableSeats<=0){
            return res.status(400).send('No available seats on this bus')
        }
        if(!bus){
            return res.status(404).send('Bus not found')
        }
        const existingBookingSeat=await Bookings.findOne({
            where:{
                busId:busId,seatNumber:seatNumber
            }
        })
        if(existingBookingSeat){
            return res.status(400).send('Seat already booked')
        }
        const booking=await Bookings.create({
            userId:userId,
            busId:busId,
            seatNumber:seatNumber
        });
        bus.availableSeats-=1
        await bus.save()
        res.status(201).json(booking)

    } catch (error) {
        console.log(error);
        res.status(500).send('Unable to create booking');
    }
}

module.exports={
    addBooking
}