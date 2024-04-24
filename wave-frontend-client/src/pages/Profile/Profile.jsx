import React, { useContext, useEffect, useState } from "react";
import { EmailIdContext } from "../../context/EmailIdContext";
import { UserNameContext } from "../../context/UserNameContext";
import { getUpdatedUserProfile } from "../../api/profileapi";
import { properties } from "../../properties/properties";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import '../Profile/profile.css'

function Profile() {
  const { emailId } = useContext(EmailIdContext);
  const { userName } = useContext(UserNameContext);
  const [organization, setOrganization] = useState("");
  const [profileResponse, setProfileResponse] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        navigate("/home");
      }, 5000);
    }
  }, [isLoaded]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userProfileResponse = await getUpdatedUserProfile(
        userName,
        emailId,
        organization
      );
      // Add success message here
      setIsLoaded(true);
      setProfileResponse(properties.successProfileMsg);
      //navigate('/home')
    } catch (err) {
      setProfileResponse(properties.errorMsg);
    }
  };
  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit}>
        <Input label="Email" type="email" name="email" value={emailId} />
        <Input label="Username" type="text" name="userName" value={userName} />
        <Input
          label="Organization"
          type="text"
          name="organization"
          value={organization}
          onChange={(event) => setOrganization(event.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      {profileResponse && <p className="error">{profileResponse}</p>}
    </div>
  );
}

export default Profile;
