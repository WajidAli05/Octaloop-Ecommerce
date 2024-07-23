import { useNavigate } from "react-router-dom";
export const sortUsers = async (users) => {
    const approvedUsers = users.filter(user => user.isApprovedByAdmin);
    const pendingUsers = users.filter(user => !user.isApprovedByAdmin);
    return [...pendingUsers, ...approvedUsers];
  };
  
  export const approveUser = async (user, fetchedUsers, setFetchedUsers, setApproveUserId, setSuccessMessage, setError) => {
    try {
      const response = await fetch(`http://localhost:3001/user/approve-user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      const updatedUsers = fetchedUsers.map((u) => 
        u._id === user._id ? { ...u, isApprovedByAdmin: true } : u
      );
      setFetchedUsers(updatedUsers);
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
  
  export const deleteUser = async (user, fetchedUsers, setFetchedUsers, setSuccessMessage, setError) => {
    try {
      const response = await fetch(`http://localhost:3001/user/delete-user/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setFetchedUsers(fetchedUsers.filter((u) => u._id !== user._id));
      setSuccessMessage(data.message);
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.log("Error deleting user", error);
      setError("Error deleting user");
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };
  
  export const showApprovedUsersFirst = (fetchedUsers, setFetchedUsers) => {
    const approvedUsers = fetchedUsers.filter(user => user.isApprovedByAdmin);
    const pendingUsers = fetchedUsers.filter(user => !user.isApprovedByAdmin);
    setFetchedUsers([...approvedUsers, ...pendingUsers]);
  };
  
  export const showPendingUsersFirst = (fetchedUsers, setFetchedUsers) => {
    const approvedUsers = fetchedUsers.filter(user => user.isApprovedByAdmin);
    const pendingUsers = fetchedUsers.filter(user => !user.isApprovedByAdmin);
    setFetchedUsers([...pendingUsers, ...approvedUsers]);
  };
  
  export const showNewestUsersFirst = (fetchedUsers, setFetchedUsers) => {
    const sortedUsers = [...fetchedUsers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFetchedUsers(sortedUsers);
  };
  
  export const showOldestUsersFirst = (fetchedUsers, setFetchedUsers) => {
    const sortedUsers = [...fetchedUsers].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    setFetchedUsers(sortedUsers);
  };
  