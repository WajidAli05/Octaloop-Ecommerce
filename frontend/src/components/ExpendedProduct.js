import React, { useState , useRef , useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Navbar from './Navbar';

import { CartContext } from '../contexts/CartContext';
import ProductRecommendation from './ProductRecommendation';

//react-toastify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ExpendedProduct() {
  const { cart, setCart } = useContext(CartContext);

  const [error, setError] = useState('');
  const { state } = useLocation();
  const { product } = state || { product: {} };
  const [quantity, setQuantity] = useState(1);

  const toastId = useRef(null);


     //handle shipping toast
     const handleCartToast = () =>{
      if(! toast.isActive(toastId.current)){
          toastId.current = toast.success('Product added to cart!' , { 
              autoClose: 4000,
              pauseOnFocusLoss: false
           })
      }
  }


  if (!product) {
    return <div>No product found</div>;
  }

  const handleAddToCart = () => {
    const url = 'http://localhost:3001/cart';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ productId : product._id, quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(!data.success){
          setError(data.error);
          return;
        }

        //first check if the product is already in the cart then increase the quantity of that product otherwise add the product to the cart
        //this is done to avoid duplicate products in the cart

        const existingProduct = cart.find((item) => item._id === data.data._id);
        if (existingProduct) {
          const updatedCart = cart.map((item) =>
            item._id === data.data._id ? { ...item, quantity: item.quantity + data.data.quantity } : item
          );
          setCart(updatedCart);
          handleCartToast();
          return;
        }
      })
      .catch((error) => {
        setError('Error:', error.message);
      });
  }

  return (
    <div className='expanded-product-main-container'>
    <div className='expanded-div'>
      <Navbar />
      <div>
        <CardMedia
          component="img"
          height="800"
          image="https://www.gulahmedshop.com/media/catalog/product/b/l/black_basic_suit_sk-p24-077_8_.jpg?optimize=medium&fit=bounds&height=900&width=600"
          alt={product.name}
          className='expanded-product-image'
        />
      </div>
      <div>
        <Typography gutterBottom variant="h4" component="div" className='expanded-info-item'>
          {product.name}
        </Typography>
        <div className='discount-container'>
          <div className='stock-div'>
            <Typography variant="h6" color="text.secondary">
              {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </Typography>
          </div>
          {product.discountRate > 0 &&
          <div className='discount-div'>
            <Typography variant="h6">
              {product.discountRate > 0 ? `Flat ${product.discountRate}% Off` : ''}
            </Typography>
          </div>}

        </div>
        <Typography variant="body2" color="text.primary" className='expanded-info-item'>
          <p>SKU # :</p>
          <span>{product.sku}</span>
        </Typography>
        <Typography variant="body2" color="text.primary" className='expanded-info-item'>
          <p>PKR :</p>
          {product.discountRate > 0 ? 
          <div>
            <span className='original-price'>{product.price}</span>
            <span className='discounted-price' >{(product.price * ((100 - product.discountRate)/100)).toFixed(2)}</span>
          </div>
          : 
          <span>{product.price}</span>
          }
        </Typography>
        <div className='cart-quantity-div'>
          <Stack direction="row" spacing={2} className='expanded-info-item outline'>
            <Button variant="none" size='large' startIcon={<RemoveIcon />} onClick={() => {
              quantity > 1 ? setQuantity(pre => pre - 1) : setQuantity(pre => pre)
            }}>
            </Button>
            <span>{quantity}</span>
            <Button variant="none" size='large' startIcon={<AddIcon />} onClick={() => {
              product.quantity > quantity ? setQuantity(pre => pre + 1) : setQuantity(pre => pre)
            }}>
            </Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" size='large' endIcon={<AddShoppingCartIcon />}
                    {...(product.quantity <= 0 ? {disabled: true} : {})}
                    onClick={()=> handleAddToCart()}  >
              Add to Cart
            </Button>
          </Stack>
        </div>
        <div className='product-info-table-div'>
          <Typography gutterBottom variant="h6" component="div">
            Product Information
          </Typography>
          <TableContainer component={Paper} className='expanded-info-item'>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">Fit</TableCell>
                  <TableCell component="th" scope="row">{product.fit}</TableCell>
                </TableRow>
                <TableRow key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">Color</TableCell>
                  <TableCell component="th" scope="row">{product.color}</TableCell>
                </TableRow>
                <TableRow key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">Size</TableCell>
                  <TableCell component="th" scope="row">{product.size}</TableCell>
                </TableRow>
                <TableRow key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">Material</TableCell>
                  <TableCell component="th" scope="row">{product.material}</TableCell>
                </TableRow>
                <TableRow key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">Discount</TableCell>
                  <TableCell component="th" scope="row">{product.discountRate}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Typography gutterBottom variant="h6" component="div">
          Description
      </Typography>
        <span>{product.description}</span>
      </div>
    </div>
    <div>
      <ProductRecommendation productId={product._id} />
    </div>
    
    </div>
  )
}

export default ExpendedProduct;
