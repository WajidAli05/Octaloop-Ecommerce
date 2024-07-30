import React from 'react'

function ProductCard({product}) {
  return (
    <div className='product-card'>
        <div className='product-img-container'>
            <img src={product.image} alt={product.name} />
        </div>
      <div className='product-info-container'>
        <p>{product.name}</p>
        <p>{product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard
