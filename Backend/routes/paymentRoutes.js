const express = require('express');
const router = express.Router();
//token verification middleware
const validateToken = require('../middlesware/tokenHandlerMiddleware');

const { makePayment, getPayments } = require('../controllers/paymentController');

router.post('/checkout', makePayment);
router.get('/payments', getPayments);

module.exports = router;

