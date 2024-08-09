const logger = require('../config/logger/logger')
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

//get all the cart products
const getCartProducts = async (req, res) => {
    try {
        const cartProducts = await Cart.find({ userId: req.user.userId });
        if (cartProducts.length === 0) {
            logger.info('The cart is empty');
            return res.status(404).json({ success: false, message: 'The cart is empty' });
        }

        logger.info('Cart products fetched successfully');
        return res.status(200).json({ success: true, data: cartProducts });

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}


//add product to cart
const addProductToCart = async (req, res) => {
    try {
        const { productId , quantity } = req.body;
        const userId = req.user.userId;

        //check if the product is already in the cart
        //if yes then update the quantity
        //if no then add the product to the cart
        const product = await Cart.findOne({ userId, productId });
        let response = null;
        
        if (product) {
            response = await Cart.findOneAndUpdate({ userId, productId }, 
                { quantity: product.quantity + quantity,
                    addedAt : Date.now()
                 },
                 { new: true });
            await response.save();

        }
        else {
            const cart = new Cart({ userId, productId, quantity, 
                                    addedAt : Date.now() 
                                });
            response = await cart.save();
        }
        
        if(!response){
            logger.error('Error in adding product to cart');
            return res.status(400).json({ success: false, message: 'Error in adding product to cart' });
        }

        //decrease the quantity of product in product collection by "quantity"
        await Product.findOneAndUpdate({productId} , { $inc : {quantity : -quantity}});

        logger.info('Product added to cart successfully');
        return res.status(200).json({ success: true, message: 'Product added to cart successfully', data : response });

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}


//delete product from cart
const deleteFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.userId;

        const response = await Cart.findOneAndDelete({ userId, productId });
        console.log(response);
        if(!response){
            logger.error('Product not found in cart');
            return res.status(400).json({ success: false, message: 'Product not found in cart' });
        }


        logger.info('Product deleted from cart successfully');
        return res.status(200).json({ success: true, message: 'Product deleted from cart successfully' });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

//clear entire cart
const clearCart = async (req , res)=>{
    try{
        const cart = await Cart.deleteMany({});
        if(!cart){
            logger.info('Clearing cart unsuccessful');
            return res.status(500).json({success : false , message : 'Clearing cart unsuccessful.'})
        }

        logger.info('Cart cleared successfully.');
        return res.status(200).json({success : true , message : 'Cart cleared successfully.'});
    }
    catch(error){
        logger.error(error.message);
        return res.status(500).json({success : false , message : 'Error while clearing the cart'})
    }
}

const increaseQuantity = async (req , res)=>{
    try {
        const { productId , quantity } = req.body;
        const userId = req.user.userId;

        //find product in cart and update if found
        const cartItem = await Cart.findOneAndUpdate({userId , productId} , 
            {
                quantity : quantity+1,
            } , 
            {new : true});
        
        await cartItem.save();

        await Product.findOneAndUpdate({productId} , { $inc : {quantity : -1}});
        
        logger.info(`${cartItem.name} quantity increased successfully`)
        return res.status(200).json({ success : true , message : 'Quantity increased successfully' , data : cartItem})
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ status : false , message : 'Error While increasing quantity'})
    }
}


const decreaseQuantity = async (req , res)=>{
    try {
        const { productId , quantity } = req.body;
        const userId = req.user.userId;


        //find product in cart and update if found
        const cartItem = await Cart.findOneAndUpdate({userId , productId} , {quantity : quantity-1} , {new : true});
        await cartItem.save();

        //decrease the quantity of product in product collection by 1
        await Product.findOneAndUpdate({productId} , { $inc : {quantity : 1}});
        
        logger.info(`${cartItem.name} quantity decreased successfully`)
        return res.status(200).json({ success : true , message : 'Quantity decreased successfully' , data : cartItem})
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ status : false , message : 'Error While increasing quantity'})
    }
}

module.exports = { 
    getCartProducts,
    addProductToCart,
    deleteFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
};