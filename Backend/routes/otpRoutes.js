const express = require('express');
const router = express.Router();
const validateToken = require("../middlesware/tokenHandlerMiddleware.js");

const {
    sendOTP,
    verifyOTP
} = require('../controllers/otpController');

//these are public routes therefore tokenhandler middleware is not used here.
router.post('/sendOTP' , sendOTP);
router.post('/verifyOTP' , validateToken , verifyOTP);


module.exports = router;