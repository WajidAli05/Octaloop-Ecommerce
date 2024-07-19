const env = require("dotenv");
env.config();
const jwt = require('jsonwebtoken');
const logger = require('../config/logger/logger.js');


//generate token for the user
const generateToken = async (user) => {
    const token = jwt.sign({
        userId: user._id,
        email: user.email,
        fistName: user.firstName,
        lastName: user,
        dob : user.dob,
        username: user.username,
        isAdmin: user.isAdmin,
        isApproved: user.isApproved,
    }, process.env.JWT_SECRET, {expiresIn: "1h"});
    if(!token){
        logger.error("Token generation failed");
        return;
    }
    else{
        logger.info(token);
        return {message: "Login Successful", token};
    }
}

module.exports = generateToken;