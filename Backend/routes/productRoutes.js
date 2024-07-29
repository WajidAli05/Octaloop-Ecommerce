const express = require("express");
const router = express.Router();

const {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController');

//get all the products
router.get('/products', getProducts);

//get a single product
router.route('/products/:id').get(getProduct).delete(deleteProduct).put(updateProduct);

//add a product
router.post('/products', addProduct);

module.exports = router;