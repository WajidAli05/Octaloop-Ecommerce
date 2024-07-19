import React , { useState } from 'react'

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
        <button className={`filter-btn ${isApprovedActive ? 'active' : ''}`} 
        onClick={()=>{
          onApproveUsersFirst();
          handleApprovedClick()
          }}
          >Approved</button>

        <button className={`filter-btn ${isPendingActive ? 'active' : ''}`} 
        onClick={()=>{
          onPendingUsersFirst();
          handlePendingClick()}}
          >Pending</button>

        <button className={`filter-btn ${isNewestActive ? 'active' : ''}`} 
        onClick={()=>{
          onNewestUsersFirst();
          handleNewestClick();
        }}
        >Newest</button>

        <button className={`filter-btn ${isOldestActive ? 'active' : ''}`} 
        onClick={()=>{
          onOldestUsersFirst();
          handleOldestClick();
        }}
        >Oldest</button>
    </div>
    {/* <div>
      {error && <p>{error}</p>}
    </div> */}
    </div>
  )
}

export default Filters
