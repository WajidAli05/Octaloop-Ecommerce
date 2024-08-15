const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({ 
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
},
{
    timestamps : true,
}
);

const ContactUs = mongoose.model('ContactUs' , contactUsSchema);

module.exports = ContactUs;