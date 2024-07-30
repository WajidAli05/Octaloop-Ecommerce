import React, { useContext, useEffect, useState } from 'react';
import Filters from '../components/Filters';
import EpandedSideMenuBar from '../components/EpandedSideMenuBar';
import ClosedSideMenuBar from '../components/ClosedSideMenuBar';
import UserCard from '../components/UserCard';
import UsersContext from '../contexts/contexts/UsersContext';

import { 
  sortUsers, 
  approveUser, 
  deleteUser, 
  showApprovedUsersFirst, 
  showPendingUsersFirst, 
  showNewestUsersFirst, 
  showOldestUsersFirst 
} from '../utils/userFunctions';

function ApproveUser() {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [approveUserId, setApproveUserId] = useState(null);
  const [sideMenuOpen, setSideMenuOpen] = useState(true);

  const { fetchedUsers, setFetchedUsers } = useContext(UsersContext);

  const toggleMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        console.log('data : ' , data);
        setFetchedUsers(await sortUsers(data.users));
      } catch (error) {
        console.log("Error fetching users", error);
        setError("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='container'>
      {sideMenuOpen ? <ClosedSideMenuBar onOpen={toggleMenu} /> : <EpandedSideMenuBar onClose={toggleMenu} />}

      <Filters 
        onApproveUsersFirst={() => showApprovedUsersFirst(fetchedUsers, setFetchedUsers)}
        onPendingUsersFirst={() => showPendingUsersFirst(fetchedUsers, setFetchedUsers)}
        onNewestUsersFirst={() => showNewestUsersFirst(fetchedUsers, setFetchedUsers)}
        onOldestUsersFirst={() => showOldestUsersFirst(fetchedUsers, setFetchedUsers)} 
      />

      <div className='users-container-div'>
        {fetchedUsers.map((user) => (
          <UserCard 
            key={user._id} 
            user={user} 
            error={error} 
            successMessage={successMessage} 
            approveUser={() => approveUser(user, fetchedUsers, setFetchedUsers, setApproveUserId, setSuccessMessage, setError)} 
            deleteUser={() => deleteUser(user, fetchedUsers, setFetchedUsers, setSuccessMessage, setError)} 
            approveUserId={approveUserId} 
          />
        ))}
      </div>
    </div>
  );
}

export default ApproveUser;
