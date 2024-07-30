const express = require("express");
const router = express.Router();
const validateToken = require("../middlesware/tokenHandlerMiddleware.js");
const upload = require("../middlesware/userUpload.js");
const isAdminMiddleware = require("../middlesware/adminAccessMiddleware.js");

//import controller functions for each route from contollers directory
const {
    register,
    login , 
    getUsers,
    getUser,
    checkUserExistence,
    uploadProfileImage ,
    approveUser,
    deleteUser,
    resetPassword
} = require("../controllers/userController");

//user can register and login using the following routes
router.post("/register", upload.single("profileImage") ,register);
router.post("/login", login);
router.post("/is-user", checkUserExistence);
//router.post("/upload-profile-image", upload.single("profileImage") , uploadProfileImage);


//check access token on every request to the following routes
router.use(validateToken);
//reset password route
router.put("/reset-password", resetPassword);

//admin routes for approving and rejecting a user
router.put("/approve-user/:userId", isAdminMiddleware , approveUser);
router.delete("/delete-user/:userId", isAdminMiddleware , deleteUser);

//get all the users
router.get("/users", getUsers);
router.get("/user", getUser);

module.exports = router;
