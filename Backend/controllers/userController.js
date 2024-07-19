const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../config/logger/logger.js');
const generateToken = require('../utils/generateToken');
const env = require('dotenv');
env.config();



const register = async (req, res) => {
    try {
        const { firstName, lastName, dob, username,  email, password } = req.body;
        const profileImagePath = req.file.path;
        //call function checkEmailAndPassword to check if the email and password are valid
        await checkSignupFields(firstName, lastName, dob, username , profileImagePath);

         //call function checkEmailAndPassword to check if the email and password are valid
        await checkEmailAndPassword(email, password);
        

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
            password: hashedPassword,
            profileImagePath
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
            return res.status(400).json({success : false , message: "User does not exist"});
        }

        //check if the user is approved by the admin or not
        if(!isUser.isApprovedByAdmin){
            logger.error("User not approved by admin");
            return res.status(400).json({success : false , message: "User not approved by admin. Please wait for the admin to approve your account", 
                isApprovedByAdmin: false});
        }

        //compare the password with the hashed password in the database
        const isPassword = await bcrypt.compare(password, isUser.password);
        if(!isPassword){
            logger.error("Invalid Password");
            return res.status(400).json({success : false , message: "Invalid Password"});
        }

        //generate token for the user
        const response = await generateToken(isUser);
        if(!response){
            logger.error("Token generation failed");
            return res.status(500).json({success : false , message: "Token generation failed"});
        }

        return res.status(200).json({success : true , message: "Login Successful", 
            token: response.token,
            isAdmin: isUser.isAdmin,
            isApprovedByAdmin: isUser.isApprovedByAdmin
        });

    }
    catch(error){
        logger.error(error.message);
        return res.status(500).json({success : false , error: error.message});    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false }).select('-password'); // Exclude password field
        if (users.length === 0) {
            logger.error("No users found");
            return res.status(404).json({ message: "No users found" });
        }
        
        // Modify each user object to include the full URL for the profile image
        const baseUrl = req.protocol + '://' + req.get('host');
        const modifiedUsers = users.map(user => {
            return {
                ...user.toObject(),
                profileImagePath: user.profileImagePath ? `${baseUrl}/${user.profileImagePath}` : null
            };
        });

        logger.info("All users fetched successfully");
        return res.status(200).json({ users: modifiedUsers });
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

//this is a put method to reset the password
const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const email = req.user.email;

        //Compare new password with the old password, if same then do not allow reseting password
        const user = await User.findOne({email});
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(isValidPassword){
            logger.error("New password cannot be the same as the old password");
            return res.status(400).json({ success : false , message: "Create a new password which is not used before"});
        }

        //hash the password before storing in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        
        //update the user password with the given email
        const isPasswordReset = await User.findOneAndUpdate({email}, {password: hashedPassword});
        isPasswordReset.save();
        if(!isPasswordReset){
            logger.error("Password reset failed");
            return res.status(500).json({message: "Password reset failed"});
        }
        
        logger.info("Password reset successfully");
        return res.status(200).json({ success : true , message: "Password reset successfully"});

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
}

// ----------------------THIS FUNCTION NOT IN USE FOR NOW----------------------//
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

        logger.info(isUser.email);
        return res.status(200).json(true);
    }
    catch(error){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
}


//check all the sign up fields
const checkSignupFields = async (firstName, lastName, dob, username , profileImagePath) => {
     
    //check if any field is empty
    if(!firstName || !lastName|| !dob || !username || !profileImagePath){
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



module.exports = {
    register,
    login,
    getUsers,
    getUser,
    checkUserExistence,
    uploadProfileImage,
    approveUser,
    deleteUser,
    resetPassword
}