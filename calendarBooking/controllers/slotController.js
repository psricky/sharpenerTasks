const Slot = require('../models/Slot');
const createSlot = async (req, res) => {
    try {
        const { timeSlot, slotsAvailable } = req.body;
        if(!timeSlot || !slotsAvailable){
            return res.status(400).json({ error: 'Time slot and available slots are required' });
        }
        const newSlot = await Slot.create({ timeSlot, slotsAvailable });
        res.status(201).json(newSlot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllSlots = async (req, res) => {
    try {
        const slots = await Slot.findAll();
        res.json(slots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getAllSlots,
    createSlot
};