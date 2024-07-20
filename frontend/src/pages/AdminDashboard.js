import React, { useState } from 'react'
import ApproveUser from './ApproveUser'
import UsersTableView from '../components/UsersTableView'
import EpandedSideMenuBar from '../components/EpandedSideMenuBar'
import ClosedSideMenuBar from '../components/ClosedSideMenuBar'

function AdminDashboard() {
    const [sideMenuOpen , setSideMenuOpen] = useState(true);

    const toggleMenu = ()=>{
        setSideMenuOpen(!sideMenuOpen);
    }
    
  return (
    <div>
        {sideMenuOpen ? <ClosedSideMenuBar onOpen={toggleMenu}/> : <EpandedSideMenuBar onClose={toggleMenu} />}
      {/* <ApproveUser />
      <UsersTableView /> */}
    </div>
  )
}

export default AdminDashboard
