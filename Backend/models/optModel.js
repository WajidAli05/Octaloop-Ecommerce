const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userEmail : {
        type : String,
        required: true
    },
    otp : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 60 * 5 //the document is auto deleted after 5 minutes.
                        //So otp is valid for 5 minutes only
    }
} , 
{
    timestamps : true,
})

const otp = mongoose.model('otps' , otpSchema)

module.exports = otp;