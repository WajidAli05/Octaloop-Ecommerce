const otpGenerator = require('otp-generator');
const logger = require('../config/logger/logger')

const generateOtp = async ()=>{
    try{
       const newOtp = otpGenerator.generate(6, { digits: true ,
            specialChars: false,
             lowerCaseAlphabets : false,
             upperCaseAlphabets : false });

        return newOtp;
    }
    catch(error){
        logger.error('OTP could not be generated!');
        return false;
    }
}


module.exports = {
    generateOtp
}