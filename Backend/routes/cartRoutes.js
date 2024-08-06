const express = require("express");
const router = express.Router();
const validateToken = require("../middlesware/tokenHandlerMiddleware.js");
const {
    getCartProducts,
    addProductToCart,
    deleteFromCart,
    increaseQuantity,
    decreaseQuantity
}  = require('../controllers/cartController');

router.use(validateToken);

//get all the cart items
router.get('/cart', getCartProducts);

//add product to cart
router.post('/cart', addProductToCart);

//delete product from cart
router.delete('/cart', deleteFromCart);

router.put('/cart/increase' , increaseQuantity);
router.put('/cart/decrease' , decreaseQuantity);

module.exports = router;