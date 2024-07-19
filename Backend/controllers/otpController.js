const Otp = require('../models/optModel');
const logger = require('../config/logger/logger')
const {sendOtpOnEmail} = require('../utils/otpSenderOnEmail');
const {generateOtp} = require('../utils/otpGenerator');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
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
            await sendOtpOnEmail(email, newOtp);
            logger.info(`OTP: ${newOtp} sent successfully to email: ${email}`);

            //find user to pass to generateToken function
            const isUser = await findUser(email);
            //generate token for the user
            const response = await generateToken(isUser);

            //if token is not generated
            if(!response){
                logger.error("Token generation failed");
                res.status(400).json({success : false , message : "Token generation failed"});
            }

            //if token is generated then send the otp and token in the response
            res.status(200).json({ success: true, otp: newOtp,
                                    token : response.token,
             });
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
        const { email, otp } = req.body;

        // Check if email and otp fields are provided
        if (!email.trim() || !otp.trim()) {
            logger.warn('Email or OTP field is empty.');
            return res.status(400).json({ success: false, message: 'Email or OTP field is empty.' });
        }

        const isValidOtp = await Otp.findOneAndDelete({ userEmail: email, otp });

        // Check if OTP is valid
        if (!isValidOtp) {
            logger.info('Invalid OTP.');
            return res.status(404).json({ success: false, message: 'Invalid OTP entered.' });
        }

        // If OTP is valid
        logger.info(`OTP: ${otp} verified successfully for email: ${email}`);
        return res.status(200).json({ success: true, message: 'OTP verification successful.' });

    } catch (error) {
        logger.error('OTP could not be verified', error);
        return res.status(500).json({ message: 'OTP verification unsuccessful. Try again with a new OTP.' });
    }
}

//find user with the email
const findUser = async (email) => {
    try {
        const isUser = await User.findOne({ email });
        if(isUser){
            return isUser;
        }
        else{
            return false;
        }
    } catch (error) {
        logger.error(error.message);
        return false;
    }
}


module.exports = {
    sendOTP,
    verifyOTP
}