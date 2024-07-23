import React, { useState , useEffect , useContext} from 'react'
import EpandedSideMenuBar from '../components/EpandedSideMenuBar'
import ClosedSideMenuBar from '../components/ClosedSideMenuBar'
import UsersContext from '../contexts/contexts/UsersContext';

//import charts and graphs
import UsersPieChart from '../components/UsersPieChart';
import UsersBarChart from '../components/UsersBarChart';




function AdminHome() {
    const [sideMenuOpen , setSideMenuOpen] = useState(true);
    const [fetchUsersError, setFetchUsersError] = useState('');
    const { fetchedUsers, setFetchedUsers } = useContext(UsersContext);

    //useEffect to fetch all the users when the component mounts
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
          setFetchedUsers(data.users);
        } catch (error) {
          console.log("Error fetching users", error);
          setFetchUsersError("Error fetching users");
        }
      };
  
      fetchUsers();
    }, []);

    //function to toggle the side menu
    const toggleMenu = ()=>{
        setSideMenuOpen(!sideMenuOpen);
    }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {sideMenuOpen ? <ClosedSideMenuBar onOpen={toggleMenu}/> : <EpandedSideMenuBar onClose={toggleMenu} />}
      <div className='charts-container'>
        <div className='piechart' >
          <UsersPieChart users={fetchedUsers} />
        </div>
        <div className='barchart'>
          <UsersBarChart users={fetchedUsers} />
        </div>
      </div>
    </div>
  )
}

export default AdminHome;
