import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

function EpandedSideMenuBar({onClose}) {
  const navigate = useNavigate();

  return (
    <div className='side-menu-bar'>
      <div className='menu-control' onClick={onClose}>
        <ArrowCircleLeftIcon fontSize='large' />
      </div>
      <h1>Admin Menu</h1>
      <div className='menu-items' onClick={()=> navigate('/adminHome')}>
        <Link to='/adminHome' className='link'>Home</Link>
        <HomeIcon fontSize='large' />
      </div>
      <div className='menu-items' onClick={()=> navigate('/approveUser')}>
        <Link to='/approveUser' className='link'>Detailed View</Link>
        <SettingsOverscanIcon fontSize='large' />
      </div>
      <div className='menu-items' onClick={()=>{navigate('/usersTableView')}}>
        <Link to='/usersTableView' className='link'>Table View</Link>
        <TableRowsIcon fontSize='large' />
      </div>
      <div className='menu-items'>
        <Link className='link'>Log Out</Link>
        <LogoutIcon fontSize='large' />
      </div>
    </div>
  )
}

export default EpandedSideMenuBar
