const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please tell us your first name!']
    },
    lastName: {
        type: String,
        required: [true, 'Please tell us your last name!']
    },
    dob:{
        type: Date,
        required: [true, 'Please tell us your date of birth!']
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        // unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    passwordConfirm: {
        type: String,
        //required: [true, 'Please confirm your password']
    },
    isApprovedByAdmin: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

}, 
{
    timestamps: true
}
);


const User = mongoose.model('User', userSchema);

module.exports = User;
