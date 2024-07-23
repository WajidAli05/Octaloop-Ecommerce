import React, { useContext, useState } from 'react';
import ExpandedSideMenuBar from '../components/EpandedSideMenuBar';
import ClosedSideMenuBar from '../components/ClosedSideMenuBar';
import UsersTable from '../components/UsersTable';
import UsersContext from '../contexts/contexts/UsersContext'


function TableView() {
    const {fetchedUsers} = useContext(UsersContext);
    const pendingUsers = fetchedUsers.filter((user)=> !user.isApprovedByAdmin).length;
    const approvedUsers = fetchedUsers.filter((user)=> user.isApprovedByAdmin).length;

    const [sideMenuOpen, setSideMenuOpen] = useState(true);

    const toggleMenu = () => {
        setSideMenuOpen(!sideMenuOpen);
    }

    const findNewRegistrations = (users) => {
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
        const newRegistrations = users.filter(user => new Date(user.createdAt) > oneDayAgo);
        return newRegistrations.length;
    };

    return (
        <div className='table-view-container'>
            {sideMenuOpen ? <ClosedSideMenuBar onOpen={toggleMenu} /> : <ExpandedSideMenuBar onClose={toggleMenu} />}
            <div className='stat-card-container'> 
                <div className='stat-card' >
                    <h4>Total</h4>
                    <p>Total Users : {fetchedUsers.length}</p>
                </div>
                <div className='stat-card' >
                    <h4>Pending Users</h4>
                    <p>Pending : {pendingUsers}</p>
                </div>
                <div className='stat-card' >
                    <h4>Approved Users</h4>
                    <p>Approved : {approvedUsers}</p>
                </div>
                <div className='stat-card' >
                <h4>New Users Since Yesterday</h4>
                <p>New : {findNewRegistrations(fetchedUsers)}</p>
                </div>
            </div>
            <UsersTable users={fetchedUsers} />
        </div>
    );
}

export default TableView;
