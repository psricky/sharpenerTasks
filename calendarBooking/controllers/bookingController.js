const Meeting = require("../models/Booking");
const Slot=require("../models/Slot")

const  generateMeetLink = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 10; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `meet.google.com/${code.slice(0,3)}-${code.slice(3,7)}-${code.slice(7)}`;
}

console.log(generateMeetLink()); // Example output: meet.google.com/abc-defg-hij

const bookingEntry=async(req,res)=>{
    try {
         const {name,email,slotId}=req.body;
        // const slot=await Slot.findByPk(slotId)
        // if(slot.availableSlots<=0){
        //     return res.status(400).send('No slots available')
        // }
        const link = generateMeetLink();
        const newBooking=await Meeting.create({name,email,link,slotId});
        const slot=await Slot.findOne({
            where:{
                id:slotId
            }
        })
        slot.slotsAvailable-=1
        await slot.save()
        const timeSlot = slot.dataValues.timeSlot;
        const obj = {...newBooking.dataValues, timeSlot }
        res.status(201).json(obj);
    } catch (error) {
        console.log(error)        
        res.status(500).json({error:"Failed to create booking"});
    }
};

const getAllBookings=async(req,res)=>{
    try {
        const bookings=await Meeting.findAll({
            include: [{
                model: Slot, attributes:['timeSlot']
            }]
        });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({error:"Failed to retrieve bookings"});
    }
};
const deleteBooking=async(req,res)=>{
    try {
        const {id}=req.params;
        const meeting = await Meeting.findByPk(id);
        const slot = await Slot.findByPk(meeting.slotId);
        await Meeting.destroy({
           where:{
            id
           }
        });
        slot.slotsAvailable +=1;
        await slot.save();
        res.status(200).send("Deletd successfully");
        
    } catch (error) {
        res.status(500).json({error:"Failed to retrieve bookings"});
    }
};
module.exports={
    bookingEntry,
    getAllBookings,
    deleteBooking
};