import React , { useState } from 'react'
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


function ExpendedProduct({product}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className='expanded-div'>
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
             {product.quantity > 0 ? 'In Stock' : 'Out of Stock' }
          </Typography>
        </div>
        <div className='discount-div'>
        <Typography variant="h6">
          {product.discountRate > 0 ? `Flat ${product.discountRate}% Off` : '' }
          </Typography>
        </div>
      </div>

      <Typography variant="body2" color="text.primary" className='expanded-info-item'>
          <p>SKU # : </p>
          <span>{product.sku}</span>
      </Typography>
      <Typography variant="body2" color="text.primary" className='expanded-info-item'>
        <p>PKR : </p>
        <span>{product.price}</span>
      </Typography>
      <div className='cart-quantity-div' >
        <Stack direction="row" spacing={2} className='expanded-info-item outline'>
          <Button variant="none" size='large' startIcon={<RemoveIcon />} onClick={()=>{
            quantity > 1 ? setQuantity(pre=>pre - 1) : setQuantity(pre=>pre)}}
            >
          </Button>
          <span>{quantity}</span>
          <Button variant="none" size='large' startIcon={<AddIcon />} onClick={()=>{
            product.quantity > quantity ? setQuantity(pre=>pre + 1) : setQuantity(pre=>pre)}}
            >
          </Button>
        </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" size='large' endIcon={<AddShoppingCartIcon />}>
          Add to Cart
        </Button>
      </Stack>
      </div>
      <div className='product-info-table-div'>
        {/* table for additional product information */}
      <Typography gutterBottom variant="h6" component="div">
          Product Information
      </Typography>
      <TableContainer component={Paper} className='expanded-info-item'>
        <Table aria-label="simple table">
          <TableBody>
            {/* product fit */}
            <TableRow  key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Fit
              </TableCell>
                <TableCell component="th" scope="row">
                {product.fit}
              </TableCell>
            </TableRow>
            {/* product color */}
            <TableRow  key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Color
              </TableCell>
                <TableCell component="th" scope="row">
                {product.color}
              </TableCell>
            </TableRow>
            {/* Product size */}
            <TableRow  key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Size
              </TableCell>
                <TableCell component="th" scope="row">
                {product.size === 'M' ? 'Medium' : product.size === 'L' ? 'Large' : product.size === 'S' ? 'Small' : ''}
              </TableCell>
            </TableRow>
            {/* Product category */}
            <TableRow  key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Category
              </TableCell>
                <TableCell component="th" scope="row">
                {product.category}
              </TableCell>
            </TableRow>
            {/* Product customerCategory */}
            <TableRow  key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                For
              </TableCell>
                <TableCell component="th" scope="row">
                {product.customerCategory ? product.customerCategory : 'Unisex'}
              </TableCell>
            </TableRow>
            {/* Product type */}
            <TableRow  key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Type
              </TableCell>
                <TableCell component="th" scope="row">
                {product.type}
              </TableCell>
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
  )
}

export default ExpendedProduct
