import React from 'react'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LogoutIcon from '@mui/icons-material/Logout';

function EpandedSideMenuBar({onClose}) {
  return (
    <div className='side-menu-bar'>
      <div className='menu-control' onClick={onClose}>
        <ArrowCircleLeftIcon fontSize='large' />
      </div>
      <h1>Admin Menu</h1>
      <div className='menu-items'>
        <a>Detailed View</a>
        <SettingsOverscanIcon fontSize='large' />
      </div>
      <div className='menu-items'>
        <a>List View</a>
        <TableRowsIcon fontSize='large' />
      </div>
      <div className='menu-items'>
        <a>Log Out</a>
        <LogoutIcon fontSize='large' />
      </div>
    </div>
  )
}

export default EpandedSideMenuBar
