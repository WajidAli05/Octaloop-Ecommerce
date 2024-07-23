// import React, { useContext, useEffect, useState } from 'react';
// import Filters from '../components/Filters';
// import EpandedSideMenuBar from '../components/EpandedSideMenuBar';
// import ClosedSideMenuBar from '../components/ClosedSideMenuBar';
// import UserCard from '../components/UserCard';
// import UsersContext from '../contexts/contexts/UsersContext';

// function ApproveUser() {
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [approveUserId, setApproveUserId] = useState(null);
//   const [sideMenuOpen, setSideMenuOpen] = useState(true);

//   const { fetchedUsers, setFetchedUsers } = useContext(UsersContext);

//   const toggleMenu = () => {
//     setSideMenuOpen(!sideMenuOpen);
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/user/users", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         const data = await response.json();
//         console.log('data : ' , data);
//         setFetchedUsers(await sortUsers(data.users));
//         console.log('fetched users : ' , fetchUsers)
//       } catch (error) {
//         console.log("Error fetching users", error);
//         setError("Error fetching users");
//       }
//     };

//     fetchUsers();
//   }, []);

//   const sortUsers = async (users) => {
//     const approvedUsers = users.filter(user => user.isApprovedByAdmin);
//     const pendingUsers = users.filter(user => !user.isApprovedByAdmin);
//     return [...pendingUsers, ...approvedUsers];
//   };

//   const approveUser = async (user) => {
//     try {
//       const response = await fetch(`http://localhost:3001/user/approve-user/${user._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       const data = await response.json();
//       const updatedUsers = fetchedUsers.map((u) => 
//         u._id === user._id ? { ...u, isApprovedByAdmin: true } : u
//       );
//       setFetchedUsers(updatedUsers);
//       setApproveUserId(user._id);
//       setSuccessMessage(data.message);
//       setTimeout(() => {
//         setSuccessMessage('');
//         setApproveUserId(null);
//       }, 3000);
//     } catch (error) {
//       console.log("Error approving user", error);
//       setError("Error approving user");
//       setTimeout(() => {
//         setError('');
//       }, 3000);
//     }
//   };

//   const deleteUser = async (user) => {
//     try {
//       const response = await fetch(`http://localhost:3001/user/delete-user/${user._id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       const data = await response.json();
//       setFetchedUsers(fetchedUsers.filter((u) => u._id !== user._id));
//       setSuccessMessage(data.message);
//       setTimeout(() => {
//         setSuccessMessage('');
//       }, 3000);
//     } catch (error) {
//       console.log("Error deleting user", error);
//       setError("Error deleting user");
//       setTimeout(() => {
//         setError('');
//       }, 3000);
//     }
//   };

//   const showApprovedUsersFirst = () => {
//     const approvedUsers = fetchedUsers.filter(user => user.isApprovedByAdmin);
//     const pendingUsers = fetchedUsers.filter(user => !user.isApprovedByAdmin);
//     setFetchedUsers([...approvedUsers, ...pendingUsers]);
//   };

//   const showPendingUsersFirst = () => {
//     const approvedUsers = fetchedUsers.filter(user => user.isApprovedByAdmin);
//     const pendingUsers = fetchedUsers.filter(user => !user.isApprovedByAdmin);
//     setFetchedUsers([...pendingUsers, ...approvedUsers]);
//   };

//   const showNewestUsersFirst = () => {
//     const sortedUsers = [...fetchedUsers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     setFetchedUsers(sortedUsers);
//   };

//   const showOldestUsersFirst = () => {
//     const sortedUsers = [...fetchedUsers].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//     setFetchedUsers(sortedUsers);
//   };

//   return (
//     <div className='container'>
//       {sideMenuOpen ? <ClosedSideMenuBar onOpen={toggleMenu} /> : <EpandedSideMenuBar onClose={toggleMenu} />}

//       <Filters 
//         onApproveUsersFirst={showApprovedUsersFirst}
//         onPendingUsersFirst={showPendingUsersFirst}
//         onNewestUsersFirst={showNewestUsersFirst}
//         onOldestUsersFirst={showOldestUsersFirst} 
//       />

//       <div className='users-container-div'>
//         {fetchedUsers.map((user) => (
//           <UserCard 
//             key={user._id} 
//             user={user} 
//             error={error} 
//             successMessage={successMessage} 
//             approveUser={() => approveUser(user)} 
//             deleteUser={() => deleteUser(user)} 
//             approveUserId={approveUserId} 
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ApproveUser;



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
