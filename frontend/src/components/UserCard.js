import React from 'react'

function UserCard({user, error , successMessage , approveUser , deleteUser , approveUserId }) {
  return (
    <div key={user._id} className='user-div'>
            <img className='profile-image' src={user.profileImagePath} alt={user.username} />
            <p>Name: {user.firstName || ''}</p>
            <p>Last Name: {user.lastName || ''}</p>
            <p>Date of Birth: {new Date(user.dob).toDateString() || ''}</p>
            <p>Username: {user.username || ''}</p>
            <p>Email: {user.email || ''}</p>
            <p>Approval Status: {user.isApprovedByAdmin ? 'Approved' : 'Approval Pending'}</p>
            {error && <p className='error-msg'>{error}</p>}
            {successMessage && user._id === approveUserId && <p className='success-msg'>{successMessage}</p>}
            <div className='btn-div'>
              {!user.isApprovedByAdmin ? 
              <button className='approve-button btn' onClick={() => approveUser(user)}>Approve</button> : 
              <button className='approve-button btn' disabled={user.isApprovedByAdmin} title= 'User already approved!'>Approved</button>}
              
              {/* Admin can reject even the approved users */}
              <button className='reject-button btn alert-btn' onClick={()=>deleteUser(user)}>Delete Permanently</button>
            </div>
    </div>
  )
}

export default UserCard
