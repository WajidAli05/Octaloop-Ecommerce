import React from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'

function Homepage() {
  const product = {
    imgUrl : 'https://royaltag.com.pk/cdn/shop/files/CFC240158-SKY_1.jpg?v=1717993985',
    name: 'Formal Shirt',
    price: 'PKR 2000'
  }

  return (
    <div className='homepage-container'>
      <Navbar />
      <ProductFilters />
      <ProductCard product={product} />
      <ProductCard product={product} />
      <ProductCard product={product} />
      <ProductCard product={product} />
      <ProductCard product={product} />
      <ProductCard product={product} />
      <ProductCard product={product} />
      <ProductCard product={product} />
      <ProductCard product={product} />
      <ProductCard product={product} />
      <ProductCard product={product} />
      <ProductCard product={product} />
    </div>
  )
}

export default Homepage

