const logger = require('../config/logger/logger');
const ContactUs = require('../models/contactUsModel');
const User = require('../models/userModel');

const contactUs = async (req, res) => {
try {
    const { firstName, lastName, email, phone, message } = req.body;
    const { userId } = req.user;

    if (!firstName || !lastName || !email || !phone || !message) {
        logger.error("All fields are required");
        return res.status(400).json({success : false , message: "All fields are required" });
    }

    //check if user exists
    const user = await User.findById(userId);
    if (!user) {
        logger.error("User not found");
        return res.status(404).json({ success : false , message: "User not found" });
    }

    //if everything is ok then save the message
    const contactUs = new ContactUs({
        userId,
        firstName,
        lastName,
        email,
        phone,
        message
    });

    await contactUs.save();

    if (!contactUs) {
        logger.error("Something went wrong");
        return res.status(500).json({ success : false , message: "Something went wrong" });
    }

    logger.info("Message sent successfully");
    res.status(200).json({ success : true ,  message: "Message sent successfully" });

} catch (error) {
    logger.error(error);
    res.status(500).json({ success : false , message: "Internal Server Error" });
}
}


//get all contact messages
const getContactMessages = async (req, res) => {
    try {
        const contactMessages = await ContactUs.find();

        if (!contactMessages) {
            logger.error("No messages found");
            return res.status(404).json({ success : false , message: "No messages found" });
        }

        logger.info("Messages found successfully");
        res.status(200).json({ success : true , message: "Messages sent successfully" , contactMessages });
        
    } catch (error) {
        logger.error(error);
        res.status(500).json({ success : false , message: "Internal Server Error" });
    }
}

//get all messages by user id
const getMessagesByUserId = async (req, res) => {
    try {
        const { userId } = req.user;

        if (!userId) {
            logger.error("User Id is required");
            return res.status(400).json({ success : false , message: "User Id is required" });
        }

        const message = await ContactUs.find({ userId });

        if (!message) {
            logger.error("Message not found");
            return res.status(404).json({ success : false , message: "Message not found" });
        }

        logger.info("Message found successfully");
        res.status(200).json({ success : true , message });
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({ success : false , message: "Internal Server Error" });
    }
}

//get messages by email address
const getMessagesByEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email) {
            logger.error("Email is required");
            return res.status(400).json({ success : false , message: "Email is required" });
        }   

        //check if email exists
        const Messages = await ContactUs.find({ email});

        if (!Messages) {
            logger.error("Message not found");
            return res.status(404).json({ success : false , message: "Message not found" });
        }

        logger.info("Message found successfully");
        res.status(200).json({ success : true , Messages });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ success : false , message: "Internal Server Error" });
    }
}


//delete a message by user id
const deleteMessagesByUserId = async (req, res) => {
    try {
        const { userId } = req.user;

        if (!userId) {
            logger.error("User Id is required");
            return res.status(400).json({ success : false , message: "User Id is required" });
        }

        const message = await ContactUs.deleteMany({ userId });

        if (!message) {
            logger.error("Message not found");
            return res.status(404).json({ success : false , message: "Message not found" });
        }

        logger.info("Message deleted successfully");
        res.status(200).json({ success : true , message: "Message deleted successfully" });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ success : false , message: "Internal Server Error" });
    }
}


module.exports = {
    contactUs,
    getContactMessages,
    getMessagesByUserId,
    getMessagesByEmail,
    deleteMessagesByUserId
}