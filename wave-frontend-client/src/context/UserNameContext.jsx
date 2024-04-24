import React from 'react'
import { createContext,useState } from 'react'

export const UserNameContext = createContext();

function UserNameProvider(props) {

    const [userName,setUserName] = useState();
    

  return (
    <div>
        <UserNameContext.Provider value={{userName,setUserName}}>
            {props.children}
        </UserNameContext.Provider>
    </div>
  )
}

export default UserNameProvider