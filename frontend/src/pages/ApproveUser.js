import React, { useEffect, useState } from 'react';
import Filters from '../components/Filters';

function ApproveUser() {
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [approveUserId , setApproveUserId] = useState(null);
    
  useEffect(() => {
    const fetchUsers = async () => {
      console.log('fetching users');
      // Fetch users from database
      try {
        const response = await fetch("http://localhost:3001/user/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('response', response);
        const data = await response.json();
      

        //sort users before setting them in state
        setUsers(await sortUsers(data.users));
      } catch (error) {
        console.log("Error fetching users", error);
        setError("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  //sort the users. Approved users first and then pending users
  const sortUsers = async(users) => {
    const approvedUsers = users.filter(user => user.isApprovedByAdmin);
    const pendingUsers = users.filter(user => !user.isApprovedByAdmin);
    return [...pendingUsers , ...approvedUsers];
  }

  // Approve user function
  const approveUser = async (user) => {
    try {
      // Access approve-user route
      const response = await fetch(`http://localhost:3001/user/approve-user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      console.log(data.message);
  
      // Update user status locally
      const updatedUsers = users.map((u) => 
        u._id === user._id ? { ...u, isApprovedByAdmin: true } : u
      );
      setUsers(updatedUsers);
      setApproveUserId(user._id);
      setSuccessMessage(data.message);
      setTimeout(() => {
        setSuccessMessage('');
        setApproveUserId(null);
      }, 3000);
    } catch (error) {
      console.log("Error approving user", error);
      setError("Error approving user");
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };
  

//delete a user permanently
const deleteUser = async (user) => {
  try{
    fetch(`http://localhost:3001/user/delete-user/${user._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data.message);

      //filter users to remove the deleted user
      setUsers(users.filter((u)=> u._id !== user._id))
      setSuccessMessage(data.message);
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    });
  }
  catch(error){
    console.log("Error deleting user", error);
    setError("Error deleting user");
    setTimeout(() => {
      setError('');
    }, 3000	);
  }
}

const showApprovedUsersFirst = () => {
  try{
    const approvedUsers = users.filter(user => user.isApprovedByAdmin);
    const pendingUsers = users.filter(user => !user.isApprovedByAdmin);
    setUsers([...approvedUsers, ...pendingUsers]);
    return;
  }
  catch(error){
    console.log("Error sorting users", error);
  }
}

const showPendingUsersFirst = () => {
  try{
    const approvedUsers = users.filter(user => user.isApprovedByAdmin);
    const pendingUsers = users.filter(user => !user.isApprovedByAdmin);
    setUsers([...pendingUsers, ...approvedUsers]);
    return;
  }
  catch(error){
    console.log("Error sorting users", error);
  }
}

const showNewestUsersFirst = () => {
  try{
    const sortedUsers = [...users].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    setUsers(sortedUsers);
    return;
  }
  catch(error){
    console.log("Error sorting users", error);
  }
}

const showOldestUsersFirst = () => {
  try{
    const sortedUsers = [...users].sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
    setUsers(sortedUsers);
    return;
  }
  catch(error){
    console.log("Error sorting users", error);
  }
}
  return (
    <div className='container'>

      <Filters onApproveUsersFirst = {showApprovedUsersFirst}
                onPendingUsersFirst = {showPendingUsersFirst}
                onNewestUsersFirst = {showNewestUsersFirst}
                onOldestUsersFirst = {showOldestUsersFirst} 
      />

      <div className='users-container-div'>
        {users.map((user) => (
          <div key={user._id} className='user-div'>
            {console.log('Image path' , user.profileImagePath)}
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
        ))}
      </div>
    </div>
  );
}

export default ApproveUser;
