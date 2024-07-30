import React from 'react';

function ProductFilters({ price, setPrice, size, setSize, fit, setFit, discount, setDiscount, onApplyFilters, minMaxPrice }) {
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSize([...size, value]);
    } else {
      setSize(size.filter((s) => s !== value));
    }
  };

  const handleFitChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFit([...fit, value]);
    } else {
      setFit(fit.filter((f) => f !== value));
    }
  };

  return (
    <div className='product-filters-container'>
      <div className='price'>
        <h3>Price</h3>
        <input
          type='range'
          min={minMaxPrice().min}
          max={minMaxPrice().max}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <p>{price}</p>
      </div>
      <div className='fit'>
        <h3>Fit</h3>
        <div>
          <input type='checkbox' value='Regular' onChange={handleFitChange} />
          <label>Regular</label>
        </div>
        <div>
          <input type='checkbox' value='Slim' onChange={handleFitChange} />
          <label>Slim</label>
        </div>
        <div>
          <input type='checkbox' value='Skinny' onChange={handleFitChange} />
          <label>Skinny</label>
        </div>
        <div>
          <input type='checkbox' value='Loose' onChange={handleFitChange} />
          <label>Loose</label>
        </div>
      </div>
      <div className='size'>
        <h3>Size</h3>
        <div>
          <input type='checkbox' value='S' onChange={handleSizeChange} />
          <label>Small</label>
        </div>
        <div>
          <input type='checkbox' value='M' onChange={handleSizeChange} />
          <label>Medium</label>
        </div>
        <div>
          <input type='checkbox' value='L' onChange={handleSizeChange} />
          <label>Large</label>
        </div>
        <div>
          <input type='checkbox' value='XL' onChange={handleSizeChange} />
          <label>Extra Large</label>
        </div>
      </div>
      <div className='discount'>
        <h3>Discount</h3>
        <input
          type='range'
          min='0'
          max='100'
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <p>{discount}%</p>
      </div>
      <button className='filters-btn' onClick={onApplyFilters}>Apply Filters</button>
      <button className='reset-filters' onClick={() => window.location.reload()}>Clear Filters</button>
    </div>
  );
}

export default ProductFilters;
