const express = require("express");
const router = express.Router();
const upload = require('../middlesware/productUpload');
const validateToken = require('../middlesware/tokenHandlerMiddleware');

const {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
    getMenProducts,
    getWomenProducts,
    getKidsProducts
} = require('../controllers/productController');

//get all the products
router.get('/products', getProducts);

//get only men products
router.get('/men-products' , getMenProducts);

//get only women products
router.get('/women-products' , getWomenProducts);

//get only kids products
router.get('/kids-products' , getKidsProducts);

router.use(validateToken);
//add a product
router.post('/products', upload.single('productImage') , addProduct);

//get a single product
router.route('/products/:id').get(getProduct).delete(deleteProduct).put(updateProduct);


module.exports = router;