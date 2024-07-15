const Otp = require('../models/optModel');
const logger = require('../config/logger/logger')
const {sendOtpOnEmail} = require('../utils/otpSenderOnEmail');
const {generateOtp} = require('../utils/otpGenerator');
const User = require('../models/userModel');

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email.trim()){
            logger.warn('Email not entered.')
            res.status(400).json({success : false , message : 'Email is empty. Enter email and try again.'});
        }

        // Uncomment and handle user existence check if needed
        // const isExistingUser = await User.findOne({ email });
        // if (!isExistingUser) {
        //     logger.error(`User not found against email: ${email}`);
        //     return res.status(404).json({ message: 'Email address does not exist. Try Signing up!' });
        // }

        const newOtp = await generateOtp();

        if (!newOtp) {
            logger.error('Generating OTP unsuccessful!');
            return res.status(400).json({ message: 'Generating OTP unsuccessful!' });
        }

        const savedOtp = new Otp({
            userEmail: email,
            otp: newOtp
        });
        await savedOtp.save();

        try {
            const emailInfo = await sendOtpOnEmail(email, newOtp);
            logger.info(`OTP: ${newOtp} sent successfully to email: ${email}`);
            res.status(200).json({ success: true, otp: newOtp });
        } catch (error) {
            logger.error('OTP could not be sent! Try again.', error);
            res.status(400).json({ success: false, message: "OTP could not be sent" });
        }
    } catch (error) {
        logger.error(`Could not send OTP.`, error);
        res.status(400).json({ message: 'Sending OTP unsuccessful. Try again with a new OTP.' });
    }
}

const verifyOTP = async (req, res) => {
    try {
        const {email , otp} = req.body;

        //email and otp are required fields
    if(!email.trim() || ! otp.trim()){
        logger.warn('Email or OTP field is empty.')
        res.status(400).json({success : false , message : 'Email or OTP field is empty.'})
    }

    const isValidOtp = Otp.findOne({userEmail : email , otp });

    //if not a valid otp
    if(!isValidOtp){
        logger.info('Invalid OTP.');
        res.status(404).json({success : false , message : 'Invalid OTP entered.'});
    }

    //if otp is valid
    logger.info(`OTP : ${otp} verified successfully for email : ${email}`);
    res.status(200).json({success : true , message : 'OTP verification successful.'})

    } catch (error) {
        logger.error(`OTP against ${email} could not be verified`);
        res.status(400).json({ message: 'OTP verification unsuccessful. Try again with a new OTP.' });
    }
}

module.exports = {
    sendOTP,
    verifyOTP
}