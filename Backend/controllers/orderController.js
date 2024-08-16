const logger = require('../config/logger/logger');
const Order = require('../models/orderModel');
const Shipping = require('../models/shippingModel');

const createOrder = async (req, res) => {
    try {
        const { products , totalAmount , orderStatus , payment , shipping } = req.body;
        //delivery date is current date + 7 days
        const deliveryDate = new Date() + 7;
        const { userId } = req.user;

        if (!products || !totalAmount || !orderStatus) {
            logger.error("All fields are required");
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        //check if shipping exists in the database
        const shippingExists = await Shipping.findById(shipping);
        if (!shippingExists) {
            logger.error("Shipping not found");
            return res.status(404).json({ success: false, message: "Shipping not found" });
        }

        // if everything is ok then save the order
        const order = new Order({
            user: userId,
            products,
            totalAmount,
            orderStatus,
            payment,
            shipping,
            deliveryDate
        });

        await order.save();

        logger.info("Order created successfully");
        return res.status(200).json({ success: true, message: "Order created successfully" });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

//update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, orderStatus } = req.body;

        if (!orderId || !orderStatus) {
            logger.error("All fields are required");
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        //check if order exists in the database
        const orderExists = await Order.findById(orderId);
        if (!orderExists) {
            logger.error("Order not found");
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        //update order status
        await Order.findByIdAndUpdate(orderId, { orderStatus });

        logger.info("Order status updated successfully");
        return res.status(200).json({ success: true, message: "Order status updated successfully" });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

//get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId });
        return res.status(200).json({ success: true, orders });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

//get order by id
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            logger.error("Order not found");
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        return res.status(200).json({ success: true, order });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


//cancel order
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            logger.error("All fields are required");
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        //check if order exists in the database
        const orderExists = await Order.findById(orderId);
        if (!orderExists) {
            logger.error("Order not found");
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        //update order status to cancelled
        await Order.findByIdAndUpdate(orderId, { orderStatus: 'Cancelled' });

        logger.info("Order cancelled successfully");
        return res.status(200).json({ success: true, message: "Order cancelled successfully" });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


module.exports = { createOrder, updateOrderStatus, getOrders, getOrderById, cancelOrder };
