import React from 'react'
import { createContext,useState } from 'react'

export const EmailIdContext = createContext();

function EmailIdProvider(props) {

    const [emailId,setEmailId] = useState();
    

  return (
    <div>
        <EmailIdContext.Provider value={{emailId,setEmailId}}>
            {props.children}
        </EmailIdContext.Provider>
    </div>
  )
}

export default EmailIdProvider