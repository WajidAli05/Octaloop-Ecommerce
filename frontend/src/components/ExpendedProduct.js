import React from 'react'
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

function ExpendedProduct({product}) {
  return (
    <div>
      <div>
      <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.name}
        />
      </div>
      <div>
      <Typography gutterBottom variant="h2" component="div">
          {product.name}
      </Typography>
      </div>
    </div>
  )
}

export default ExpendedProduct
