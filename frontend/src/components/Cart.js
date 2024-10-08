import React, { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import Navbar from './Navbar';

//react-toastify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [city , setCity] = useState('');
    const [zip, setZip] = useState('');
    const [street , setStreet] = useState('');
    const phonePrefix = '+92-';
    const [phone , setPhone] = useState(phonePrefix);
    const [total , setTotal] = useState(0);
    const [coupon , setCoupon] = useState(0);

    const toastId = useRef(null);
    const shippingRef = useRef(null);
    const shippingId = '';

    const cities = [
        'Karachi',
        'Lahore',
        'Islamabad',
        'Rawalpindi',
        'Faisalabad',
        'Multan',
        'Peshawar',
        'Quetta',
        'Sialkot',
        'Hyderabad',
    ];
    

    // Fetch cart items
    const fetchCartItems = async () => {
        try {
            const response = await fetch('http://localhost:3001/cart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Allow-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            const data = await response.json();
            setCartItems(data.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    // Fetch product details for each item in the cart
    const fetchProductDetails = async () => {
        const productIds = cartItems.map(item => item.productId);
        try {
            const requests = productIds.map(id => 
                fetch(`http://localhost:3001/products/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Allow-Control-Allow-Origin': '*',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }).then(res => res.json())
            );
            const results = await Promise.all(requests);
            const productData = results.reduce((acc, data) => {
                acc[data.data._id] = data.data;
                console.log(data.data);
                return acc;
            }, {});
            setProductDetails(productData);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };


    //find total price of the cart
    const findTotal = () => {
        let totalAmount = 0;
        
        cartItems.forEach(item => {
            const product = productDetails[item.productId];
            if (product) {
                const itemPrice = product.price * item.quantity;
                const discountedPrice = product.discountRate > 0 
                    ? itemPrice * ((100 - product.discountRate) / 100) 
                    : itemPrice;
                    
                totalAmount += discountedPrice;
            }
        });
    
        setTotal(totalAmount.toFixed(2));
    };
    


    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        if (cartItems?.length > 0) {
            fetchProductDetails();            
        }
    }, [cartItems]);

    useEffect(() => {
        findTotal();
    }, [cartItems, productDetails]);
    
    
    

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    // Functions to handle cart operations
    const increaseQuantity = (productId, quantity) => {
        let url = 'http://localhost:3001/cart/increase';

        fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ productId, quantity })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCartItems(prevItems =>
                        prevItems.map(item =>
                            item.productId === productId
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    );
                }
            })
            .catch((error) => setError(error.message));
    }

    const decreaseQuantity = (productId, quantity) => {
        let url = 'http://localhost:3001/cart/decrease';

        fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ productId, quantity })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCartItems(prevItems =>
                        prevItems.map(item =>
                            item.productId === productId
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                    );
                }
            })
            .catch((error) => setError(error.message));
    }

    const deleteItem = (productId) => {
        const url = 'http://localhost:3001/cart';

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ productId })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCartItems(prevItems =>
                        prevItems.filter(item => item.productId !== productId)
                    );
                    setProductDetails(prevDetails => {
                        const newDetails = { ...prevDetails };
                        delete newDetails[productId];
                        return newDetails;
                    });
                } else {
                    console.error(data.message);
                    setError(data.message);
                }
            })
            .catch((error) => {
                console.error('Error deleting item:', error);
                setError(error.message);
            });
    };


    //update the shipping address in the backend
    const addShippingAddress = async ()=>{
        const url = 'http://localhost:3001/shipping';
        const completeAddress = `${street} ${city} ${zip}`;
        await fetch(url , {
            method: "POST",
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            body : JSON.stringify({address : completeAddress , phone})
        })
        .then((res)=> res.json())
        .then((data)=>{
            if(!data.success){
                setError(data.message);
            }
            else{                
                shippingId = data.data._id;
                setSuccess(data.message);
            }
        })
        .catch((error)=> setError(error.message));
    }

    //handle shipping toast
    const handleShippingToast = () =>{

        if(city && zip && street && phone && !toast.isActive(toastId.current)){
            shippingRef.current.style.borderColor = '#333';
            toastId.current = toast.success('Shipping address added successfully!' , { 
                autoClose: 4000,
                pauseOnFocusLoss: false
             })
             return;
        }

        //this should also display only once for 4 seconds even if user clicks multiple times
        if(!toast.isActive(toastId.current)){
            shippingRef.current.style.borderColor = 'red';
            toastId.current = toast.error('Please fill all the fields!' , { 
                autoClose: 4000,
                pauseOnFocusLoss: false
             })
        }
    }

    //complete purchase
    const completePurchase = async () => {
        // if(!city || !zip || !street || !phone){
        //     shippingRef.current.style.borderColor = 'red';
        //     shippingRef.current.style.backgroundColor = '#ffbcbc';
        //     return;
        // }
        
        //load stripe
        const stripe = await loadStripe('pk_test_51PoMqHP4pCdByGgNfxPjl21R67x9ZiyWZzO7EY9e8KOicK8O7hzzscwBs3kcZ0qOFNCB3Xp3LTltLXtX113hisbe00cIWX9bTR');
    
        fetch('http://localhost:3001/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ products : productDetails , total })
        })
        .then((res) => res.json())
        .then((data)=>{
            if(data.success){
                setSuccess(data.message);
                stripe.redirectToCheckout({ sessionId: data.sessionId });
            }
            else{
                setError(data.message);
            }
        })
        .catch((error)=> setError(error.message));
    }

    // //post order
    // const postOrder = async () => {
    //     const url = 'http://localhost:3001/create';
      
    //     const orderData = {
    //         products: cartItems.map(item => ({
    //             product: item.productId,
    //             quantity: item.quantity,
    //             price: productDetails[item.productId]?.price || 0,
    //         })),
    //         totalAmount: parseFloat(total), // Already calculated in findTotal method
    //         orderStatus: 'Pending', // Default status
    //         payment: null, // Set to actual payment ID if payment is mandatory, or leave as null
    //         shipping: shippingId, // Set to actual shipping ID if required
    //     };
    
    //     try {
    //         console.log('orderData', orderData);
            
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             },
    //             body: JSON.stringify(orderData),
    //         });
    
    //         const data = await response.json();
    
    //         if (data.success) {
    //             setSuccess('Order placed successfully!');
    //             // Optionally clear cart or redirect to order confirmation page
    //         } else {
    //             setError(data.message || 'Failed to place order');
    //         }
    //     } catch (error) {
    //         setError('Error placing order: ' + error.message);
    //     }
    // };
    

    return (
        <div className='cart-main-container'>
        <Navbar />
        <div className='cart-div' >
            <div className='cart-table'>
                <div className='cart-heading-div'>
                    <Typography variant="h4" component="h1" color="text.primary">
                        Cart
                    </Typography>
                    <Typography variant="h6" component="h1" color="text.secondary">  
                        <ShoppingBasketIcon /> {cartItems ? cartItems?.length : 'No'} items in the cart
                    </Typography>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ITEM</StyledTableCell>
                                <StyledTableCell align="right">PRICE</StyledTableCell>
                                <StyledTableCell align="right">QUANTITY</StyledTableCell>
                                <StyledTableCell align="right">ACTION</StyledTableCell>
                                <StyledTableCell align="right">TOTAL</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems?.map((item) => {
                                const product = productDetails[item.productId];                                 
                                return (
                                    <StyledTableRow key={item.productId}>
                                        <StyledTableCell component="th" scope="row">
                                            <Typography variant="h6" gutterBottom>
                                                <div className='name-img-div' >
                                                    <img src='https://www.gulahmedshop.com/media/catalog/product/b/l/black_basic_suit_sk-p24-077_8_.jpg?optimize=medium&fit=bounds&height=900&width=600'
                                                        alt={product ? product.name : 'Loading...'} />
                                                    <span>{product ? product.name : 'Loading...'}</span>
                                                </div>
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Typography variant="h6" gutterBottom>
                                                <span>PKR{product ? product.price : 'Loading...'}</span>
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <div className='quantity-div'>
                                                <Button variant="outlined" onClick={() =>
                                                    decreaseQuantity(item.productId, item.quantity)
                                                }>
                                                    <RemoveCircleOutlineIcon />
                                                </Button>
                                                <Typography variant="h6" gutterBottom>
                                                    {item.quantity || 'Loading...'}
                                                </Typography>
                                                <Button variant="outlined" onClick={() =>
                                                    increaseQuantity(item.productId, item.quantity)
                                                }>
                                                    <AddCircleOutlineIcon />
                                                </Button>
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button variant="outlined" color='error'
                                                onClick={() => deleteItem(item.productId)}
                                            >
                                                <DeleteForeverIcon />
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Typography variant="h6" gutterBottom>
                                                {product && product.discountRate > 0 ? 
                                                    <div>
                                                        <span className='original-price'>PKR{(product.price * item.quantity).toFixed(2)}</span>
                                                        <span className='discounted-price'>PKR{(product.price * item.quantity * ((100 - product.discountRate)/100)).toFixed(2)}</span>
                                                    </div>
                                                    : 
                                                    <span>{product ? `PKR${product.price}` : 'Loading...'}</span>
                                                }
                                                {console.log('total' , total)
                                                }
                                            </Typography>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='shipping-total-div'>
                <div className='shipping-div' ref={shippingRef} onFocus={()=> {
                    //reset to default styles
                    shippingRef.current.style.backgroundColor = ''
                    shippingRef.current.style.borderColor = '#333'
                    }} >
                    <ToastContainer />
                    <div className='header'>
                        <Typography variant="h5" component="h1" color="text.primary" className="header-text">
                            Calculated Shipping
                        </Typography>
                        <LocalShippingIcon fontSize='large' color='primary' className="shipping-icon" />
                    </div>
                    <div className="dropdown-container">
                        <label htmlFor='cities'>
                            <Typography variant="subtitle1" component="h1" color="text.primary">
                                Select your city
                            </Typography>
                        </label>
                        <select name='cities' value={city} className="custom-select" onChange={(e)=> setCity(e.target.value)}>
                            {cities.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className='zip-container'>
                        <label htmlFor='zip'>
                            <Typography variant="subtitle1" component="h1" color="text.primary">
                                Zip Code
                            </Typography>
                        </label>
                        <input type='text' value={zip} name='zip' placeholder='Zip Code' onChange={(e)=> setZip(e.target.value)} className="input-field" />
                    </div>
                    <div className='street-container'>
                        <label htmlFor='street'>
                            <Typography variant="subtitle1" component="h1" color="text.primary">
                                Street Address
                            </Typography>
                        </label>
                        <input type='text' value={street} name='street' placeholder='Street Address' onChange={(e)=> setStreet(e.target.value)} className="input-field" />
                    </div>
                    <div className='phone-container'>
                        <label htmlFor='phone'>
                            <Typography variant="subtitle1" component="h1" color="text.primary">
                                Phone Number
                            </Typography>
                        </label>
                        <input type='tel' value={phone} name='phone' placeholder='Phone Number' onChange={(e)=>{
                            const value = e.target.value;
                            if(value.startsWith(phonePrefix)){
                                setPhone(value);
                            }
                        }} className="input-field" />
                    </div>
                    <Button 
                        variant="contained" 
                        className="update-button"
                        onClick={async ()=>{
                            await addShippingAddress();
                            handleShippingToast();
                        }}>
                            
                            Update
                    </Button>
                </div>

                <div className='total-div'>
                    <div>
                        <Typography variant="h5" component="h1" color="text.primary">  
                            Cart Total
                        </Typography>
                        <ReceiptLongIcon fontSize='large' color='primary' className="total-icon" />
                    </div>
                    <div className='total-summary-div'>
                        <div>
                            <Typography variant="subtitle2" component="h1" color="text.primary">  
                                Cart subtotal 
                            </Typography>
                            <Typography variant="subtitle2" component="h1" color="text.primary">  
                                PKR {total}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle2" component="h1" color="text.primary">  
                                Additional Discount  
                            </Typography>
                            <Typography variant="subtitle2" component="h1" color="text.primary">  
                                PKR -00.00
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" component="h1" color="text.primary">  
                                Cart Total  
                            </Typography>
                            <Typography variant="h6" component="h1" color="text.primary">  
                                PKR {total}
                            </Typography>
                        </div>
                        <Button 
                            variant="contained" 
                            className="purchase-button"
                            // {...(!city || !zip || !street || !phone ? {disabled: true} : {})}
                            onClick={completePurchase}>
                            Complete Purchase
                        </Button>
                    </div>
                </div>

            </div>
        </div>
        </div>
    );
}
export default Cart;
