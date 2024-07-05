const express = require("express");
const router = express.Router();
const validateToken = require("../middlesware/tokenHandlerMiddleware.js");

//import controller functions for each route from contollers directory
const {
    register,
    login , 
    getUsers,
    getUser,
    checkUserExistence
} = require("../controllers/userController");

//user can register and login using the following routes
router.post("/register", register);
router.post("/login", login);
router.post("/is-user", checkUserExistence);

//check access token on every request to the following routes
router.use(validateToken);

//get all the users
router.get("/users", getUsers);
router.get("/user", getUser);

module.exports = router;
