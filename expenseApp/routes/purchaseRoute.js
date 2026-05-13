const express = require('express');
const router = express.Router();

const purchaseController = require('../controller/purchaseController');
const authMiddleware= require('../middleware/auth');

router.post('/premium', authMiddleware.authenticate, purchaseController.createPayment);
//router.post('/update-order', authMiddleware.authenticate, purchaseController.createOrder);
router.get('/payment-status/:orderId', purchaseController.getpaymentStatus);

module.exports = router;