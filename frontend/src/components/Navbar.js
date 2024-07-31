import React , { useRef , useState } from 'react'

//Material UI icons import
import { Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LoginIcon from '@mui/icons-material/Login';


function Navbar({onMenProducts , onWomenProducts , onKidsProducts , onShowAllProducts}) {
    //use ref to get the value of the input field
    const searchValue = useRef('');
    const [searchClicked , setSearchClicked] = useState(false);

  return (
    <nav className='navbar'>
        <div className='categories-links-div'>
            <ul className='categories-links'>
                <li onClick={()=>onShowAllProducts()} >All</li>
                <li onClick={()=>onWomenProducts()} >Women</li>
                <li onClick={()=>onMenProducts()} >Men</li>
                <li onClick={()=>onKidsProducts()} >Kids</li>
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
                    <input type='text' ref={searchValue} placeholder='Search' />
                </li>
                }
                <li>
                    <Tooltip title='Cart' placement='top' arrow>
                        <LocalMallIcon />
                    </Tooltip>
                </li>
                <li>
                    <Tooltip title='login' placement='top' arrow>
                        <LoginIcon />
                    </Tooltip>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
