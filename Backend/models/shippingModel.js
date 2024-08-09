const mongoose = require('mongoose');	

const shippingSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        //this will change to required: true when Order schema is ready
        required: false
    },	
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
}, 
{
    timestamps : true,
}
);

module.exports = mongoose.model('Shipping', shippingSchema);
