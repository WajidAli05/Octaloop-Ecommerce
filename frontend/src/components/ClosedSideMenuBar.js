import React from 'react'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LogoutIcon from '@mui/icons-material/Logout';


function ClosedSideMenuBar({onOpen}) {
  return (
    <div className='closed-side-menu-bar'>
        <div className='closedmenu-items' onClick={onOpen} >
          <ArrowCircleRightIcon className='sidebar-expandicon' fontSize='large' />
        </div>
      <div className='closedmenu-items'>
        <SettingsOverscanIcon fontSize='large' />
      </div>
      <div className='closedmenu-items'>
        <TableRowsIcon fontSize='large' />
      </div>
      <div className='closedmenu-items'>
        <LogoutIcon fontSize='large' />
      </div>
    </div>
  )
}

export default ClosedSideMenuBar
