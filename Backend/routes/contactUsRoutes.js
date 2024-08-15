const express = require('express');
const router = express.Router();
const validateToken = require('../middlesware/tokenHandlerMiddleware');

const {
    contactUs,
    getContactMessages,
    getMessagesByUserId,
    getMessagesByEmail,
    deleteMessagesByUserId
} = require('../controllers/contactUsController');

router.use(validateToken);
router.post('/contactUs',  contactUs);
router.get('/contactUs',  getContactMessages);
router.get('/getByUserId',  getMessagesByUserId);
router.get('/getByEmail',  getMessagesByEmail);
router.delete('/contactUs',  deleteMessagesByUserId);

module.exports = router;