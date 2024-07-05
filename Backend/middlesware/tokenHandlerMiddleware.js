const jwt = require('jsonwebtoken');
const logger = require('../config/logger/logger.js');
const env = require('dotenv');

// Load environment variables from .env file
env.config();

const validateToken = async (req, res, next) => {
    try {
        // Get the token from the header
        const authHeader = req.header('Authorization');

        // Deny access if the authorization header is not present
        if (!authHeader) {
            logger.warn("Access Denied: No Authorization header");
            return res.status(401).json({ message: "Access Denied: No Authorization header" });
        }

        // Extract the token from the authorization header
        const token = authHeader.split(' ')[1];

        // Deny access if the token is not present
        if (!token) {
            logger.warn("Access Denied: No Token provided");
            return res.status(401).json({ message: "Access Denied: No Token provided" });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                logger.error("Invalid Token");
                return res.status(400).json({ message: "Invalid Token" });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = validateToken;
