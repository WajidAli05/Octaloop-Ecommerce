const express = require("express");
const router = express.Router();
const validateToken = require("../middlesware/tokenHandlerMiddleware.js");
const upload = require("../middlesware/upload.js");
const isAdminMiddleware = require("../middlesware/adminAccessMiddleware.js");

//import controller functions for each route from contollers directory
const {
    register,
    login , 
    getUsers,
    getUser,
    checkUserExistence,
    uploadProfileImage ,
    approveUser
} = require("../controllers/userController");

//user can register and login using the following routes
router.post("/register", register);
router.post("/login", login);
router.post("/is-user", checkUserExistence);
router.post("/upload-profile-image", upload.single("profileImage") , uploadProfileImage);

//check access token on every request to the following routes
router.use(validateToken);
//admin route for approving the users
router.put("/approve-user", isAdminMiddleware , approveUser);

//get all the users
router.get("/users", getUsers);
router.get("/user", getUser);

module.exports = router;
