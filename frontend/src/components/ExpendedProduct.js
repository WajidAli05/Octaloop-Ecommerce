import React from 'react'
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

function ExpendedProduct({product}) {
  return (
    <div className='expanded-div'>
      <div>
      <CardMedia
            component="img"
            height="800"
            image="https://www.gulahmedshop.com/media/catalog/product/b/l/black_basic_suit_sk-p24-077_8_.jpg?optimize=medium&fit=bounds&height=900&width=600"
            alt={product.name}
        />
      </div>
      <div>
      <Typography gutterBottom variant="h4" component="div">
          {product.name}
      </Typography>
      <Typography variant="body2" color="text.primary" className='expanded-info-item'>
          <p>SKU # : </p>
          <span>{product.sku}</span>
      </Typography>
      <Typography variant="body2" color="text.primary" className='expanded-info-item'>
        <p>PKR : </p>
        <span>{product.price}</span>
      </Typography>
      <Typography variant="body2" color="text.primary" className='expanded-info-item'>
        <p>Size : </p>
        <span>{product.size}</span>
      </Typography>
      <Typography variant="body2" color="text.primary" className='expanded-info-item'>
        <p>Color : </p>
        <span>{product.color}</span>
      </Typography>  
      <Typography variant="body2" color="text.primary" className='expanded-info-item'>
        <p>Description : </p>
        <span>{product.description}</span>
      </Typography>  
      </div>
    </div>
  )
}

export default ExpendedProduct
