import React, { useState } from 'react';
import ExpandedSideMenuBar from './EpandedSideMenuBar';
import ClosedSideMenuBar from './ClosedSideMenuBar';

function UsersTable({ users }) {  // Destructure the users prop
    const [sideMenuOpen, setSideMenuOpen] = useState(true);

    const toggleMenu = () => {
        setSideMenuOpen(!sideMenuOpen);
    }

    return (
        <div className="table-container">
            {sideMenuOpen ? <ClosedSideMenuBar onOpen={toggleMenu} /> : <ExpandedSideMenuBar onClose={toggleMenu} />}
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
                                <button className="edit-button">Approve</button>
                                <button className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;
