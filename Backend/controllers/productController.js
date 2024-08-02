const logger = require('../config/logger/logger');
const Product = require('../models/productModel');


const addProduct = async (req, res) => {
    try {
        //get attributes from request body
        const { name,
            description,
            price,
            size,
            color,
            category,
            sku,
            discountRate,
            quantity,
            customerCategory,
            type,
            fit
        } = req.body;

        //get product image path
        const productImagePath = req.file ? req.file.path : '';

        //check required attributes can not be empty
        if(!checkEmptyFields(name , description , price , size , color , productImagePath , category , sku , discountRate , quantity , customerCategory , type , fit)){
            logger.info('One or more product fields are empty.');
            return res.status(400).json({ success : false , message : 'One or more product fields are empty.'})
        }

        //check if product already exists
        const isExistingProduct = await Product.findOne({name});
        if(isExistingProduct){
            logger.info('Product already exists');
            return res.status(400).json({ success : false , message : 'Product already exists'});
        }

        const newProduct = await Product.create({
            name,description,price,size,color,image : productImagePath,
            category,sku,discountRate,quantity,customerCategory,type,fit
        });
        newProduct.save();

        if(!newProduct){
            logger.error('Product not added');
            return res.status(400).json({ success : false , message : 'Product not added'});
        }
        logger.info('Product added successfully');
        return res.status(201).json({ success : true , data : newProduct});

    } catch (error) {
        console.log(error);
        logger.error(error.message);
        return res.status(400).json({success : false , message : error.message});
    }
}
//get all the products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        logger.info('Products fetched successfully');
        return res.status(200).json({ success: true, products });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({success : false , message : error.message });
    }
};

//get men products
const getMenProducts = async (req, res) => {
    try {
        const menProducts = await Product.find({customerCategory : 'Men'});
        if(!menProducts){
            logger.info('Men products not found');
            return res.status(404).json({ success : false , message : 'Men products not found'});
        }

        logger.info('Men products fetched successfully');
        return res.status(200).json({ success: true, data: menProducts });

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({success : false , message : error.message});
    }
}

const getWomenProducts = async (req, res) => {
    try {
        const menProducts = await Product.find({customerCategory : 'Women'});
        if(!menProducts){
            logger.info('Women products not found');
            return res.status(404).json({ success : false , message : 'Women products not found'});
        }

        logger.info('Women products fetched successfully');
        return res.status(200).json({ success: true, data: menProducts });

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({success : false , message : error.message});
    }
}

const getKidsProducts = async (req, res) => {
    try {
        const menProducts = await Product.find({customerCategory : 'Kids'});
        if(!menProducts){
            logger.info('Kids products not found');
            return res.status(404).json({ success : false , message : 'Kids products not found'});
        }

        logger.info('Kids products fetched successfully');
        return res.status(200).json({ success: true, data: menProducts });

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({success : false , message : error.message});
    }
}

const getProduct = async (req, res) => {
    try {
        const isProduct = await Product.findById(req.params.id);

        //check if product exists
        if(!isProduct){
            logger.info(`Product with id ${req.params.id} does not exist.`);
            return res.status(404).json({success : false , message : `Product does not exist.`});
        }

        logger.info('Product fetched successfully');
        return res.status(200).json({ success: true, data: isProduct });

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({success : false , message : error.message});
    }
}


const updateProduct = async (req, res) => {
    try {
        //get attributes from request body
        const { name,
            description,
            price,
            size,
            color,
            category,
            sku,
            discountRate,
            quantity,
            type,
            fit
        } = req.body;

        //check required attributes can not be empty
        if(!checkEmptyFields(name , description , price , size , color , category , sku , discountRate , quantity , type , fit)){
            logger.info('One or more product fields are empty.');
            return res.status(400).json({ success : false , message : 'One or more product fields are empty.'})
        }

        const isProduct = await Product.findById(req.params.id);

        //check if product exists
        if(!isProduct){
            logger.info(`Product with id ${req.params.id} does not exist.`);
            return res.status(404).json({success : false , message : `Product does not exist.`});
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id , {
            name,description,price,size,color,
            category,sku,discountRate,quantity,type,fit
        } , {new : true , runValidators : true});

        if(!updatedProduct){
            logger.error('Product not updated');
            return res.status(400).json({ success : false , message : 'Product not updated'});
        }
        logger.info('Product updated successfully');
        return res.status(200).json({ success : true , data : updatedProduct});
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({success : false , message : error.message});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const isProduct = await Product.findById(req.params.id);

        //check if product exists
        if(!isProduct){
            logger.info(`Product with id ${isProduct} does not exist.`);
            return res.status(404).json({success : false , message : `Product does not exist.`});
        }

        await Product.findByIdAndDelete(isProduct);
        logger.info('Product deleted successfully');
        return res.status(200).json({ success: true, message: 'Product deleted successfully' });

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({success : false , message : error.message});
    }
}


// ***********************Additional Functions for clean coding*****************************
const checkEmptyFields = async (name , description , price , size , color , productImagePath , category , sku , discountRate , quantity , customerCategory , type , fit)=>{
    //if condition on all the fields
    if(!name || !description || !price || !size || !color || !productImagePath || !category || !sku || !discountRate || !quantity || !customerCategory || !type || !fit){
        return false;
    }
    else{
        return true;
    }
}




module.exports = { 
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
    getMenProducts,
    getWomenProducts,
    getKidsProducts
 };