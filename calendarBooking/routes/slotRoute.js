const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');

router.post('/slots/add', slotController.createSlot);
router.get('/slots', slotController.getAllSlots);
module.exports = router;
