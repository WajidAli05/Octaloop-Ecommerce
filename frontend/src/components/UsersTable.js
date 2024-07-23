import React, { useState , useEffect , useContext } from 'react';
import ExpandedSideMenuBar from './EpandedSideMenuBar';
import ClosedSideMenuBar from './ClosedSideMenuBar';
import UsersContext from '../contexts/contexts/UsersContext';
import Filters from './Filters';
import {
    sortUsers, 
    approveUser, 
    deleteUser, 
    showApprovedUsersFirst, 
    showPendingUsersFirst, 
    showNewestUsersFirst, 
    showOldestUsersFirst
} from '../utils/userFunctions'

function UsersTable({ users }) {  // Destructure the users prop
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [approveUserId, setApproveUserId] = useState(null);
    const [sideMenuOpen, setSideMenuOpen] = useState(true);

    const { fetchedUsers, setFetchedUsers } = useContext(UsersContext);

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

    const toggleMenu = () => {
        setSideMenuOpen(!sideMenuOpen);
    }

    return (
        <div className="table-container">
            {sideMenuOpen ? <ClosedSideMenuBar onOpen={toggleMenu} /> : <ExpandedSideMenuBar onClose={toggleMenu} />}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}
            <Filters 
                onApproveUsersFirst={() => showApprovedUsersFirst(fetchedUsers, setFetchedUsers)}
                onPendingUsersFirst={() => showPendingUsersFirst(fetchedUsers, setFetchedUsers)}
                onNewestUsersFirst={() => showNewestUsersFirst(fetchedUsers, setFetchedUsers)}
                onOldestUsersFirst={() => showOldestUsersFirst(fetchedUsers, setFetchedUsers)} 
            />
            <table className="users-table">
                <thead>
                    <tr>
                        <th>SNo.</th>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Registration Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.firstName + ' ' + user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>{user.isApprovedByAdmin ? 'Approved' : 'Pending'}</td>
                            <td>
                                {user.isApprovedByAdmin ? 
                                <button className="approve-btn" disabled>Approved</button> : 
                                <button className="approve-btn" 
                                onClick={() => 
                                approveUser(user, fetchedUsers, setFetchedUsers, setApproveUserId, setSuccessMessage, setError)} >
                                    Approve
                                </button>}
                                <button className="delete-btn" onClick={() => deleteUser(user, fetchedUsers, setFetchedUsers, setSuccessMessage, setError)} >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;
