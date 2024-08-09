const express = require('express');
const router = express.Router();
const validateToken = require("../middlesware/tokenHandlerMiddleware.js");
const {
    getShippingDetails,
    addShippingDetails,
    updateShippingDetails,
    deleteShippingDetails
} = require('../controllers/shippingController');




router.use(validateToken);

router.route('/shipping')
    .get(getShippingDetails)
    .post(addShippingDetails)
    .put(updateShippingDetails)
    .delete(deleteShippingDetails);

module.exports = router;

