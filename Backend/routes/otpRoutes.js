const express = require('express');
const router = express.Router();
const {
    sendOTP,
    verifyOTP
} = require('../controllers/otpController');

//these are public routes therefore tokenhandler middleware is not used here.
router.get('/sendOTP' , sendOTP);
router.get('/verifyOTP' , verifyOTP);


module.exports = router;