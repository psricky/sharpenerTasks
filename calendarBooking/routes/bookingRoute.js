const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/bookings/add", bookingController.bookingEntry);
router.get("/bookings", bookingController.getAllBookings);
router.delete('/bookings/:id',bookingController.deleteBooking);
module.exports = router;