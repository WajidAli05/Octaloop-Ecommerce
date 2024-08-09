const mongoose = require('mongoose');	

const shippingSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        //this will change to required: true when Order schema is ready
        required: false
    },	
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    shippingDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        Enumerator: ['Shipped', 'Delivered', 'Cancelled'],
    },
});

module.exports = mongoose.model('Shipping', shippingSchema);
