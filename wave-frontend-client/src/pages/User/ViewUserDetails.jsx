import React from "react";
import { useContext } from "react";
import "../User/viewuserdetails.css";

function ViewUserDetails({user}) {

  return (
    <div className="user-profile-details-container">
      <div>
        <img
          className="profil-pic"
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
          alt="profile_img"
        />
      </div>
      <div>
        <h4>{user}</h4>
      </div>
    </div>
  );
}

export default ViewUserDetails;
