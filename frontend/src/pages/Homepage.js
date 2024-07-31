import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import CircularProgress from '@mui/material/CircularProgress';
import NoProductsFound from '../components/NoProductsFound';
import ExpendedProduct from '../components/ExpendedProduct';

function Homepage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(1000); // set initial price to maximum value
  const [size, setSize] = useState([]);
  const [fit, setFit] = useState([]);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const url = 'http://localhost:3001/products';

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Allow-Control-Allow-Origin': '*'
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.products)) {
          setProducts(data.products);
          setFilteredProducts(data.products); // Initialize filteredProducts with fetched products
        } else {
          console.error('Fetched data is not an array:', data);
          setProducts([]);
          setFilteredProducts([]);
        }
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setProducts([]);
        setFilteredProducts([]);
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  const applyFilters = () => {
    let filtered = products;

    // Filter by price
    filtered = filtered.filter((product) => product.price <= price);

    // Filter by size
    if (size.length > 0) {
      filtered = filtered.filter((product) => size.includes(product.size));
    }

    // Filter by fit
    if (fit.length > 0) {
      filtered = filtered.filter((product) => fit.includes(product.fit));
    }

    // Filter by discount
    filtered = filtered.filter((product) => product.discountRate >= discount);

    setFilteredProducts(filtered);
  };

  //find the max and min price of the products
  const findMinMaxPrice = () => {
    let min = 0;
    let max = 0;
    products.forEach((product) => {
      if (product.price < min) {
        min = product.price;
      }
      if (product.price > max) {
        max = product.price + 1;
      }
    });
    return { min, max };
  }

  //show only men products only
  const showMenProducts = () => {
    setFilteredProducts(products.filter(product => product.customerCategory === 'Men' ));
  }

  const showWomenProducts = () => {
    setFilteredProducts(products.filter(product => product.customerCategory === 'Women' ));
  }
  const showKidsProducts = () => {
    setFilteredProducts(products.filter(product => product.customerCategory === 'Kids' ));
  }

//show all products
const showAllProducts = () => {
  setFilteredProducts(products);
}

  return ( // className='homepage-container'
    <div>
      <Navbar 
      onMenProducts = {showMenProducts}
      onWomenProducts = {showWomenProducts}
      onKidsProducts = {showKidsProducts}
      onShowAllProducts = {showAllProducts}
       />
      {/* <ProductFilters
        price={price}
        setPrice={setPrice}
        size={size}
        setSize={setSize}
        fit={fit}
        setFit={setFit}
        discount={discount}
        setDiscount={setDiscount}
        onApplyFilters={applyFilters}
        minMaxPrice={findMinMaxPrice}
      />

      {loading && <CircularProgress />} 
      {!loading && filteredProducts.length === 0 && <NoProductsFound />} 
      {!loading && filteredProducts.length > 0 && filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))} */}

{products.map((product) => (
        <ExpendedProduct key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Homepage;
