const express = require('express');
const router = express.Router();

const {  createOrder, 
        updateOrderStatus, 
        getOrders, 
        getOrderById, 
        cancelOrder  } 
= require('../controllers/orderController');


router.post('/create', createOrder);
router.put('/update-status', updateOrderStatus);
router.get('/orders', getOrders);
router.get('/order/:id', getOrderById);
router.put('/cancel', cancelOrder);

module.exports = router;

