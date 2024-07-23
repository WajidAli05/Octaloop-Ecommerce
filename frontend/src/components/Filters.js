import React , { useState } from 'react'
import PersonOffIcon from '@mui/icons-material/PersonOff';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonIcon from '@mui/icons-material/Person';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';

import { Tooltip } from '@mui/material';

function Filters({onApproveUsersFirst , onPendingUsersFirst , onNewestUsersFirst , onOldestUsersFirst}) {

  const [isApprovedActive , setIsApprovedActive] = useState(false);
  const [isPendingActive , setIsPendingActive] = useState(false);
  const [isNewestActive , setIsNewestActive] = useState(false);
  const [isOldestActive , setIsOldestActive] = useState(false);

  //function for changing the color of Approved button when clicked
  const handleApprovedClick = () => {
    setIsApprovedActive(!isApprovedActive);
  }

  //function for changing the color of Pending button when clicked
  const handlePendingClick = () => {
    setIsPendingActive(!isPendingActive);
  }

  //function for changing the color of Newest button when clicked
  const handleNewestClick = () => {
    setIsNewestActive(!isNewestActive);
  }

  //function for changing the color of Oldest button when clicked
  const handleOldestClick = () => {
    setIsOldestActive(!isOldestActive);
  }

  return (
    <div className='container'>
      <div className='filters-container'>
        <p>Apply Filters : </p>
        <Tooltip title='Approved' placement='top' arrow>
          <button className={`filter-btn ${isApprovedActive ? 'active' : ''}`} 
          onClick={()=>{
            onApproveUsersFirst();
            handleApprovedClick();
            }}
            >Approved
            <VerifiedUserIcon fontSize='small' />
            </button>
        </Tooltip>

        <Tooltip title='Pending' placement='top' arrow>
          <button className={`filter-btn ${isPendingActive ? 'active' : ''}`} 
          onClick={()=>{
            onPendingUsersFirst();
            handlePendingClick()}}
            >Pending 
            <PersonOffIcon fontSize='small' /> 
            </button>
        </Tooltip>

        <Tooltip title='Newest' placement='top' arrow> 
          <button className={`filter-btn ${isNewestActive ? 'active' : ''}`} 
          onClick={()=>{
            onNewestUsersFirst();
            handleNewestClick();
          }}
          >Newest 
          <PersonIcon fontSize='small' />
          </button>
        </Tooltip>

        <Tooltip title='Oldest' placement='top' arrow> 
          <button className={`filter-btn ${isOldestActive ? 'active' : ''}`} 
          onClick={()=>{
            onOldestUsersFirst();
            handleOldestClick();
          }}
          >Oldest
          <HourglassFullIcon fontSize='small' />
          </button>
        </Tooltip>
    </div>
    {/* <div>
      {error && <p>{error}</p>}
    </div> */}
    </div>
  )
}

export default Filters
