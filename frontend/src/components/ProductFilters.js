import React from 'react'

function ProductFilters() {
  return (
    <div className='product-filters-container'>
      <div className='price'>
        <h3>Price</h3>
        <input type='range' min='0' max='100' />
        <button>Apply</button>
      </div>
      <div className='fit'>
        {/* two check boxes for classic fit and smart fit */}
        <h3>Fit</h3>
        <div>
            <input type='checkbox' />
            <label>Classic Fit</label>
        </div>
        <div>
            <input type='checkbox' />
            <label>Smart Fit</label>
        </div>
      </div>
      <div className='size'>
        {/* 5 check boxes for different sizes */}
        <h3>Size</h3>
        <div>
            <input type='checkbox' />
            <label>Small</label>
        </div>
        <div>
            <input type='checkbox' />
            <label>Medium</label>
        </div>
        <div>
            <input type='checkbox' />
            <label>Large</label>
        </div>
        <div>
            <input type='checkbox' />
            <label>Extra Large</label>
        </div>
        <div>
            <input type='checkbox' />
            <label>XXL</label>
        </div>
      </div>
      <div className='discount'>
        <h3>Discount</h3>
        <input type='range' min='0' max='100' />
      </div>
    </div>
  )
}

export default ProductFilters
