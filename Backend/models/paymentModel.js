const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Payment Schema
const PaymentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
//   paymentMethod: {
//     type: String,
//     enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Crypto', 'Other'],
//     required: true
//   },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  transactionDate: {
    type: Date,
    default: Date.now
  },
//   transactionId: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   paymentDetails: {
//     cardNumber: { type: String, required: false }, // Encrypted
//     cardExpiry: { type: String, required: false }, // Encrypted
//     cardCVC: { type: String, required: false },    // Encrypted
//     payerEmail: { type: String, required: false },
//     payerName: { type: String, required: false },
//     cryptoWallet: { type: String, required: false }, // For Crypto payments
//     bankAccount: { type: String, required: false } // For Bank Transfers
//   }
}, { timestamps: true });

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;

