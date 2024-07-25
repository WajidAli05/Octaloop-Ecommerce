import React from 'react'

//Material UI icons import
import { Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LoginIcon from '@mui/icons-material/Login';


function Navbar() {
  return (
    <nav className='navbar'>
        <div className='categories-links-div'>
            <ul className='categories-links'>
                <li>Women</li>
                <li>Men</li>
                <li>Kids</li>
            </ul>
        </div>
        <div>
            <h1>MART</h1>
        </div>
        <div className='navbar-icons-div'>
            <ul className='navbar-icons'> 
                <li>
                    <Tooltip title='Search' placement='top' arrow>
                        <SearchIcon />
                    </Tooltip>
                </li>
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
