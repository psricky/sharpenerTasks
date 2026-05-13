const Payment = require('../models/Payment');
const Cashfree = require('../services/cashfree');
const User = require('../models/user');
const { Order } = require('../models');


const createPayment = async (req, res) => {
  try {
    const orderId = 'ORDER_' + Date.now();
    const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
    const request = {
      order_amount: 100,
      order_currency: "INR",
      order_id: orderId,

      customer_details: {
        customer_id: req.user.id.toString(),
        customer_email: req.user.email,
        customer_phone: "9999999999"
      },
      order_meta: {
        return_url: "http://localhost:3000/purchase/payment-status/"+orderId,
        payments_methods: "ccc, upi, nb"
      },
      order_expiry_time: expiryDate.toISOString()
    };

    // Create order in Cashfree
    console.log(Cashfree);
    const response = await Cashfree.PGCreateOrder(request);

  
    await Payment.create({
      orderId: orderId,
      paymentStatus: 'PENDING',
      orderAmount: request.order_amount,
      orderCurrency: request.order_currency,
      paymentSessionId: response.data.payment_session_id,
    })
    await Order.create({
      orderId: orderId,
      status: 'PENDING',
      userId: req.user.id
    })

    res.status(200).json({
      orderId,
      paymentSessionId: response.data.payment_session_id
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: 'Something went wrong'
    });
  }
};

const getpaymentStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const response =await Cashfree.PGOrderFetchPayments(orderId);

    let getOrderResponse = response.data;

    let orderStatus = "";
    if(getOrderResponse.filter((payment) => payment.payment_status === "SUCCESS")
      .length > 0){
      orderStatus = "SUCCESS";
      await Order.update({status:"SUCCESS"},{where:{orderId:orderId}})
    } else if(getOrderResponse.filter((payment) => payment.payment_status === "PENDING").length > 0){
      orderStatus = "PENDING";
    } else {
      orderStatus = "FAILED";
    }

 
    res.status(200).json({
      paymentStatus: orderStatus
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
}

module.exports = {
  createPayment,
  getpaymentStatus
};