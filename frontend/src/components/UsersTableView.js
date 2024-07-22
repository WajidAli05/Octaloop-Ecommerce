import React, { useState } from 'react';
import EpandedSideMenuBar from './EpandedSideMenuBar'
import ClosedSideMenuBar from './ClosedSideMenuBar'

function UsersTableView(users) {
    const [sideMenuOpen , setSideMenuOpen] = useState(true);

    const toggleMenu = ()=>{
        setSideMenuOpen(!sideMenuOpen);
    }
  return (
    <div className="table-container">
        {sideMenuOpen ? <ClosedSideMenuBar onOpen={toggleMenu}/> : <EpandedSideMenuBar onClose={toggleMenu} />}
        <table className="users-table">
            <thead>
                <tr>
                    <th>SNo.</th>
                    <th>Name</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Registration Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {/* Example row structure */}
                <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>johndoe</td>
                    <td>john@example.com</td>
                    <td>2024-01-01</td>
                    <td>
                        <button className="edit-button">Edit</button>
                        <button className="delete-button">Delete</button>
                    </td>
                </tr>
                {/* Repeat rows as needed */}
            </tbody>
        </table>
    </div>
  );
}

export default UsersTableView;
