import React from 'react'
import { useNavigate } from 'react-router-dom';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Tooltip } from '@mui/material';


function ClosedSideMenuBar({onOpen}) {
  const navigate = useNavigate();
  return (
    <div className='closed-side-menu-bar'>
        <Tooltip title='Expand Menu' placement='right' arrow>
          <div className='expand-icon' onClick={onOpen} >
            <ArrowCircleRightIcon className='sidebar-expandicon' fontSize='medium' />
          </div>
        </Tooltip>
      <Tooltip title='Home' placement='right' arrow>
        <div className='closedmenu-items' onClick={()=> navigate('/adminHome')}>
          <HomeIcon fontSize='medium' />
        </div>
      </Tooltip>
      <Tooltip title='Detailed view' placement='right' arrow>
        <div className='closedmenu-items' onClick={()=> navigate('/approveUser')}>
          <SettingsOverscanIcon fontSize='medium' />
        </div>
      </Tooltip>
      <Tooltip title='Table View' placement='right' arrow>
        <div className='closedmenu-items' onClick={()=>{navigate('/usersTableView')}}>
            <TableRowsIcon fontSize='medium' />
          </div>
      </Tooltip>
      <Tooltip title='Logout' placement='right' arrow>
        <div className='closedmenu-items'>
          <LogoutIcon fontSize='medium' />
        </div>
      </Tooltip>
    </div>
  )
}

export default ClosedSideMenuBar
