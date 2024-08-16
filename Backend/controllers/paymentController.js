const env = require('dotenv').config();
const logger = require('../config/logger/logger');
const Payment = require('../models/paymentModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const makePayment = async (req, res) => {
    try {
        //products in Object of Objects
        //will change that into Array of objects
        const {total , products} = req.body;
        const {userId} = req.user;

        if (!total || !products) {
            logger.error("All fields are required");
            return res.status(400).json({ success: false, message: "All fields are required" });
        }


        // if everything is ok then save the payment
        const payment = new Payment({
            user: userId,
            order: Object.values(products),
            // paymentMethod: req.body.paymentMethod,
            amount: total,
            // transactionId: req.body.transactionId,
            // paymentDetails: req.body.paymentDetails
        });

        await payment.save();

        return res.status(200).json({ success: true, message: "Payment successful" });

    } catch (error) {
        console.log(error.message);
        logger.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user.userId });
        return res.status(200).json({ success: true, payments });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


module.exports = { makePayment, getPayments };