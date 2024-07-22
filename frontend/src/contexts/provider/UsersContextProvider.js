import React, { useState } from 'react'
import UsersContext from '../contexts/UsersContext';

const UsersContextProvider = ({children})=> {
    const [fetchedUsers , setFetchedUsers] = useState([]);
  return (
      <UsersContext.Provider value={{fetchedUsers , setFetchedUsers}} >
        {children}
      </UsersContext.Provider>
  )
}

export default UsersContextProvider