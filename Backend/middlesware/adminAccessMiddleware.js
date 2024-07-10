const User = require('../models/userModel.js');
const logger = require('../config/logger/logger.js');

const isAdmin = async (req, res, next) => {
    try{
        const email =  req.user.email;
        //if the user is logged in then get the email from the token else get the email from the request body
        const user = await User.findOne({email});

        //if user is not an admin then return
        if(!user.isAdmin){
            logger.error("Unauthorized access");
            return res.status(401).json({message: "Unauthorized access"});
        }

        req.user = user;
        //if user is admin then continue
        next();
    }
    catch(error){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
}

module.exports = isAdmin;