const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Order Schema
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled', 'Returned'],
    required: true,
    default: 'Pending'
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: 'Payment',
    required: false // This could be required if payment is mandatory at the time of order
  },
  shipping: {
    type: Schema.Types.ObjectId,
    ref: 'Shipping',
    required: false
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: {
    type: Date,
    required: false
  }
}, { timestamps: true });

// Export the model
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
