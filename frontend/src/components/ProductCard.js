import React from 'react'
import Badge from '@mui/material/Badge';

function ProductCard({product}) {
  return (
    <Badge badgeContent={`${product.discountRate} %`} color='error' >
      <div className='product-card'>
          <div className='product-img-container'>
              <img src={product?.image} alt={product.name} />
          </div>
        <div className='product-info-container'>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      </div>
    </Badge>
  )
}

export default ProductCard
