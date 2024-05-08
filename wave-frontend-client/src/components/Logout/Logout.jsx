import React from "react";
import {logout} from '..//../api/axiosInstance.js'

function Logout({setUser}) {
  const handlelogOut = (e) => {
    logout();
    setUser(null);
  };
  return <div onClick={handlelogOut}>Logout</div>;
}

export default Logout; 
