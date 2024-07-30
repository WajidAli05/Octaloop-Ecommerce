const express = require("express");
const router = express.Router();
const upload = require('../middlesware/productUpload');

const {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController');

//add a product
router.post('/products', upload.single('productImage') , addProduct);

//get all the products
router.get('/products', getProducts);

//get a single product
router.route('/products/:id').get(getProduct).delete(deleteProduct).put(updateProduct);


module.exports = router;