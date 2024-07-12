const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const logger = require('../config/logger/logger.js');
const env = require('dotenv');
env.config();


const register = async (req, res) => {
    try {
        const { firstName, lastName, dob, username,  email, password } = req.body;
        const profileImage = req.file;
        console.log(req.file);
        //call function checkEmailAndPassword to check if the email and password are valid
        await checkSignupFields(firstName, lastName, dob, username);
         //call function checkEmailAndPassword to check if the email and password are valid
        await checkEmailAndPassword(email, password);
        
        if(!req.file){
            logger.error("Please provide an image");
            return res.status(400).json({message: "Please provide an image"});
        }
        else{
            logger.info("Profile Image Uploaded Successfully");
            res.status(200).json({message: "Profile Image Uploaded Successfully"});
        }

        //check if the user already exists
        if(await User.findOne({email})){
            logger.error("User already exists");
            res.status(400).json({message: "User already exists"});
        }

        //hash the password before storing in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            dob,
            username,
            email, 
            password: hashedPassword
        });
        await user.save();

        //check if the user was created successfully or not
        if(!user){
            logger.error("Could not be created");
            res.status(500).json({message: "User Registration Failed"})
        }
        logger.info("User created successfully");
        res.status(200).json({message: "User Registered Successfully", email : user.email});
        
    } catch (error) {
        console.log(error);
        logger.error(error.message);
        res.status(500).json({error: error.message});
    }
}


//admin controller for approving a user
const approveUser = async (req, res) => {
    try{
        const userId = req.params.userId;

        //check if the user exists or not
        await User.findByIdAndUpdate(userId, {isApprovedByAdmin: true});
        logger.info("User approved by admin successfully");
        return res.status(200).json({message: "User approved by admin successfully"});
    }
    catch(error){
        logger.error(error.message);
        return res.status(500).json({message : "Could not update user status to approved!" ,error: error.message});
    }
}


//admin controller for deleting a user
const deleteUser = async (req, res) => {
    try{
        const userId = req.params.userId;

        const response = await User.findByIdAndDelete(userId);
        if(!response){
            logger.error("User not found");
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully"});
    }
    catch(error){
        logger.error(error.message);
        return res.status(500).json({message : "Error deleting the user permanently." ,error: error.message});
    }
}

const login =  async (req, res) => {
    try{
        const { email, password } = req.body;

        //call function checkEmailAndPassword to check if the email and password are valid
        await checkEmailAndPassword(email, password);

        //check if the user exists or not
        const isUser = await User.findOne({email});
        if(!isUser){
            logger.error("User does not exist");
            return res.status(400).json({message: "User does not exist"});
        }

        //check if the user is approved by the admin or not
        if(!isUser.isApprovedByAdmin){
            logger.error("User not approved by admin");
            return res.status(400).json({message: "User not approved by admin. Please wait for the admin to approve your account", 
                isApprovedByAdmin: false});
        }

        //compare the password with the hashed password in the database
        const isPassword = await bcrypt.compare(password, isUser.password);
        if(!isPassword){
            logger.error("Invalid Password");
            return res.status(400).json({message: "Invalid Password"});
        }

        //generate token for the user
        await generateToken(isUser, req , res);

    }
    catch(error){
        logger.error(error.message);
        return res.status(500).json({error: error.message});    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({isAdmin : false});
        if (users.length === 0) {
            logger.error("No users found");
            return res.status(404).json({ message: "No users found" });
        }
        logger.info("All users fetched successfully");
        return res.status(200).json({ users });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ error: error.message });
    }
};


const getUser = async (req, res) => {
    try{
        //get the email from the request body
        console.log(req.user);
        const email = req.user.email;   
        await checkEmail(email);

        //check if the user exists or not 
        const isUser = await User.findOne({email});

        if(!isUser){
            logger.error("User does not exist");
            return res.status(400).json({message: "User does not exist"});
        }

        logger.info(isUser.email);
        return res.status(200).json({email: isUser.email});
    }
    catch(error){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
}


//user profile image upload controller
const uploadProfileImage = async (req, res) => {
    if(!req.file){
        logger.error("Please provide an image");
        return res.status(400).json({message: "Please provide an image"});
    }
    else{
        logger.info("Profile Image Uploaded Successfully");
        res.status(200).json({message: "Profile Image Uploaded Successfully"});
    }
}

const checkUserExistence = async (req, res) => {
    try{
        //get the email from the request body
        const email = req.body.email;

        //check if the user exists or not 
        const isUser = await User.findOne({email});

        if(!isUser){
            logger.error("User does not exist");
            //if user does not exist then just return false
            return res.status(200).json(false);
        }


        //nodemailer mail sending logic
        await sendEmail(email);

        logger.info(isUser.email);
        return res.status(200).json(true);
    }
    catch(error){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
}


//check all the sign up fields
const checkSignupFields = async (firstName, lastName, dob, username) => {
     
    //check if any field is empty
    if(!firstName || !lastName|| !dob || !username){
        logger.error("Please fill all the fields");
        return res.status(400).json({message: "Please fill all the fields"});
    }

    
}

//----------------------FUNCTIONS DEFINED BELOW----------------------//
//functions are defined here
const checkEmailAndPassword = async (email, password) => {
    //check if the email or password or empty or invalid
    if(!email || !password){
        res.status(400).json({message: "Please provide email and password"});
    }

    //NOTE: No check on password length, you can add it if you want
    else if(!email.includes("@") || !email.includes(".") || email.length < 11 || email.length > 50){
        return res.status(400).json({message: "Please provide a valid email"});
    }
}

const checkEmail = async (email) => {
    //check if the email is empty or invalid
    if(!email){
        logger.warn("Email cannot be empty");
        return res.status(400).json({message: "Email cannot be empty"});
    }

    else if(!email.includes("@") || !email.includes(".com") || email.length < 11 || email.length > 50){
        logger.warn("Please provide a valid email");
        return res.status(400).json({message: "Please provide a valid email"});
    }
}

//send email using nodemailer
const sendEmail = async(userEmail)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email provider
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.TRANSPORTER_EMAIL,
            pass: process.env.TRANSPORTER_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.TRANSPORTER_EMAIL,
        to: userEmail,
        subject: 'Reset Your Password Reset!',
        text: 'This is a test email sent from a Node.js app!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            logger.error("An error occured while sending email : " , error);
            console.log(error);
        } else {
            logger.info("Email sent successfully");
            console.log('Email sent: ' + info.response);
        }
    });
}

//generate token for the user
const generateToken = async (user, req , res) => {
    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h"});
    if(!token){
        logger.error("Token generation failed");
        return res.status(500).json({message: "Token generation failed"});
    }
    else{
        logger.info(token);
        return res.status(200).json({message: "Login Successful", 
            token , 
            isApprovedByAdmin: 
            user.isApprovedByAdmin , 
            isAdmin: user.isAdmin
        });
    }
}

module.exports = {
    register,
    login,
    getUsers,
    getUser,
    checkUserExistence,
    uploadProfileImage,
    approveUser,
    deleteUser
}