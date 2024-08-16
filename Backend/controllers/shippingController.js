const logger = require('../config/logger/logger');
const Shipping = require('../models/shippingModel');


//get all the shipping details
const getShippingDetails = async (req, res) => {
    try {
        const { userId } = req.user;
        const shippingDetails = await Shipping.find({ userId });
        if (!shippingDetails) {
            logger.info('No shipping details found');
            return res.status(404).json({ success: false, message: 'No shipping details found' });
        }

        logger.info('Shipping details fetched successfully');
        return res.status(200).json({ success: true, message : 'Shipping details fetched successfully' , data: shippingDetails });

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

//add shipping details
const addShippingDetails = async (req, res) => {
    try {
        const { userId } = req.user;
        const { address, phone} = req.body;
        const shippingDetails = new Shipping({
            order : null,
            userId,
            address,
            phone,
        });
        await shippingDetails.save();
        logger.info('Shipping details added successfully');
        return res.status(200).json({ success: true, message: 'Shipping details added successfully' , data : shippingDetails});

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}


//update shipping details
const updateShippingDetails = async (req, res) => {
    try {
        const { userId } = req.user;
        const { address, phone } = req.body;
        const shippingDetails = await Shipping.findOneAndUpdate({ userId }, { address, phone }, { new: true });
        if (!shippingDetails) {
            logger.info('No shipping details found');
            return res.status(404).json({ success: false, message: 'No shipping details found' });
        }

        logger.info('Shipping details updated successfully');
        return res.status(200).json({ success: true, message: 'Shipping details updated successfully' });

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}


//delete shipping details
const deleteShippingDetails = async (req, res) => {
    try {
        const { userId } = req.user;
        const shippingDetails = await Shipping.findOneAndDelete({ userId });
        if (!shippingDetails) {
            logger.info('No shipping details found');
            return res.status(404).json({ success: false, message: 'No shipping details found' });
        }

        logger.info('Shipping details deleted successfully');
        return res.status(200).json({ success: true, message: 'Shipping details deleted successfully' });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}
  
    




module.exports = {
    getShippingDetails,
    addShippingDetails,
    updateShippingDetails,
    deleteShippingDetails
}