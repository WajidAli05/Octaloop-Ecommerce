import React, { useState } from 'react'
import EpandedSideMenuBar from '../components/EpandedSideMenuBar'
import ClosedSideMenuBar from '../components/ClosedSideMenuBar'

function AdminHome() {
    const [sideMenuOpen , setSideMenuOpen] = useState(true);

    const toggleMenu = ()=>{
        setSideMenuOpen(!sideMenuOpen);
    }
    
  return (
    <div>
      <h1>Admin Home</h1>
      {sideMenuOpen ? <ClosedSideMenuBar onOpen={toggleMenu}/> : <EpandedSideMenuBar onClose={toggleMenu} />}
    </div>
  )
}

export default AdminHome;
