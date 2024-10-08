import React , { useState , useContext , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';


//Material UI icons import
import { Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';


function Navbar() {
    const {cart , setCart} = useContext(CartContext);
    const navigate = useNavigate();
    const [searchClicked , setSearchClicked] = useState(false);

    //fetch cart items from backend
    useEffect(()=>{
        const url = 'http://localhost:3001/cart';

        fetch(url , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            if(data.success){
                setCart(data.data);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    } , []);

    //logout function
    const logout = () =>{
        localStorage.removeItem('token');
        navigate('/login');
    };

  return (
    <nav className='navbar'>
        <div className='categories-links-div'>
            <ul className='categories-links'>
                <li onClick={()=>navigate('/homepage')} >Home</li>
                <li onClick={()=> navigate('/contactus')} >Contact Us</li>
                <li onClick={()=> navigate('/about')} >About</li>
            </ul>
        </div>
        <div>
            <h1>MART</h1>
        </div>
        <div className='navbar-icons-div'>
            <ul className='navbar-icons'> 
                {!searchClicked && <li onClick={()=>setSearchClicked(!searchClicked)}>
                    <Tooltip title='Search' placement='top' arrow>
                        <SearchIcon />
                    </Tooltip>
                </li>
                }
                {searchClicked && <li className='seach-li' >
                    <input type='text' placeholder='Search'/>
                </li>
                }
                <li onClick={()=> navigate('/cart')} >
                    <Tooltip title='Cart' placement='top' arrow>
                        {cart.length > 0 ? 
                        <Badge badgeContent={cart.length} color='error'>
                            <LocalMallIcon />
                        </Badge>
                        :
                        <LocalMallIcon />
                        }
                    </Tooltip>
                </li>
                {localStorage.getItem('token') ? 
                    <li onClick={logout} >
                        <Tooltip title='logout' placement='top' arrow>
                            <LogoutIcon />
                        </Tooltip>
                    </li>
                    :
                    <li onClick={()=>navigate('/login')} >
                        <Tooltip title='login' placement='top' arrow>
                            <LoginIcon />
                        </Tooltip>
                    </li>
                }
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
