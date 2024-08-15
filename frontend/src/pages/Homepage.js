import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import CircularProgress from '@mui/material/CircularProgress';
import NoProductsFound from '../components/NoProductsFound';
import GenderFilter from '../components/GenderFilter';
import Footer from '../components/Footer';

function Homepage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(1000);
  const [size, setSize] = useState([]);
  const [fit, setFit] = useState([]);
  const [discount, setDiscount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const allProductsUrl = 'products';
    // const menProductsUrl = 'men-products';
    // const womenProductsUrl = 'women-products';
    // const kidsProductsUrl = 'kids-products';
    const baseUrl = 'http://localhost:3001/';
    const url = `${baseUrl}${allProductsUrl}`;

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
          setFilteredProducts(data.products);
        } else {
          console.error('Fetched data is not an array:', data);
          setProducts([]);
          setFilteredProducts([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setProducts([]);
        setFilteredProducts([]);
        setLoading(false);
      });
  }, []);

  const applyFilters = () => {
    let filtered = products;

    filtered = filtered.filter((product) => product.price <= price);

    if (size.length > 0) {
      filtered = filtered.filter((product) => size.includes(product.size));
    }

    if (fit.length > 0) {
      filtered = filtered.filter((product) => fit.includes(product.fit));
    }

    filtered = filtered.filter((product) => product.discountRate >= discount);

    setFilteredProducts(filtered);
  };

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

  const showMenProducts = () => {
    setFilteredProducts(products.filter(product => product.customerCategory === 'Men'));
  }

  const showWomenProducts = () => {
    setFilteredProducts(products.filter(product => product.customerCategory === 'Women'));
  }

  const showKidsProducts = () => {
    setFilteredProducts(products.filter(product => product.customerCategory === 'Kids'));
  }

  const showAllProducts = () => {
    setFilteredProducts(products);
  }

  return (
    <>
        <Navbar />
      <div className='homepage-main-div' >
        <GenderFilter 
              onMenProducts={showMenProducts}
              onWomenProducts={showWomenProducts}
              onKidsProducts={showKidsProducts}
              onShowAllProducts={showAllProducts}
        />
        <div className='homepage-container'>
          <div className='fitlers-div'>
            <ProductFilters
            key={price}
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
          </div>
        
          <div className='products-div'>
            {loading && <CircularProgress />} 
            {!loading && filteredProducts.length === 0 && <NoProductsFound />} 
            {!loading && filteredProducts.length > 0 && filteredProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => navigate(`/homepage/${product.name}`, { state: { product } })}>
                <ProductCard key={product.id} product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
