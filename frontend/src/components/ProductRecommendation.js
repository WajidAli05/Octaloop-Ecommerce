import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


function ProductRecommendation({productId}) {    
    const [recommendedProducts , setRecommendedProducts] = useState([]);
    const [error , setError] = useState('');
    const [isFetching , setIsFetching] = useState(true);

    const navigate = useNavigate();

    //fetch recommended products from API
    useEffect(()=>{
        console.log('page rendered');
        
        const url = `http://localhost:3001/recommended-products/${productId}`;

        fetch(url , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => res.json())
        .then((data)=>{
            setRecommendedProducts(data.data);
            setIsFetching(false);
        })
        .catch((error)=>{
            setError(error)
        })
    } , [productId])

    const handleClick = (product)=>{
        window.scrollTo({
            top : 0,
            behavior: 'smooth'
        });

        navigate(`/homepage/${product.name}` , {state : {product}});
    }


  return (
    <div className='recommended-products-div' >
        <div>
            <Typography gutterBottom variant="h3" component="div" className='expanded-info-item'>
            Recommended
            </Typography>
        </div>
        <div className='productcard-container' >
            {isFetching && <CircularProgress />}
            {
                recommendedProducts.map((product)=>(
                    <div key={product._id} 
                        onClick={() => handleClick(product) }> 
                        <ProductCard key={product._id} product={product} />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ProductRecommendation
