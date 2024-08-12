const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({ 
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    quantity : {
        type : Number,
        required : true
    }, 
    addedAt : {
        type : Date,
        required : false
    },
}, 
{
    timestamps : true,
});

const Cart = mongoose.model('Cart' , cartSchema);

module.exports = Cart;