const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true , 'Please add a name'],
        unique : true,
        trim : true,
        maxLength : [100 , 'Name cannot exceed 100 characters']
    },
    description:{
        type : String,
        required : [true , 'Please add a description'],
    },
    price:{
        type : Number,
        required : [true , 'Please add a price'],
    },
    size:{
        type : String,
        required : [true , 'Please add a size'],
        enum : ['S' , 'M' , 'L' , 'XL']
    },
    color:{
        type : String,
        required : [true , 'Please add a color'],
    },
    image:{
        type : String,
        required : true
    },
    category:{
        type : String,
        required : [true , 'Please add a category'],
    },
    sku:{
        type : String,
        required : [true , 'Please add a sku'],
    },
    discountRate : {
        type : Number,
        required : true,
        default : 0
    },
    quantity : {
        type : Number,
        default : 1,
        min : [0 , 'Quantity cannot be less than 1']
    },
    customerCategory : {
        type : String,
        required : true,
        enum: ['Men' , 'Women' , 'Kids']
    }
    ,
    type : {
        type : String,
        required : true,
        enum : ['Shirt' , 'Pant' , 'Trouser' , 'Coat' , 'Hoddie' , 'T-Shirt' , 'Polo' , 'Jeans' , 'Shorts' , 'Jacket' , 'Shoes']
    },
    fit : {
        type : String,
        required : true,
        enum : ['Regular' , 'Slim' , 'Skinny' , 'Loose']
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
});


const Product = mongoose.model('products' , productSchema);

module.exports = Product;