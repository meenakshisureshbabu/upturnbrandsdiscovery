import React, { useContext, useState } from "react";
import { useRef } from "react";
import { getRegisterStatus } from "../../api/registerapi";
import SignUp from "../SignUp/SignUp";
import { validateUsername } from "../../validation/validateInputs";
import { properties } from "../../properties/properties";
import UserNameInput from "../../components/UserNameInput";
import "../Register/registernewuser.css";
import { UserNameContext } from "../../context/UserNameContext";
//Registering the user for the first time and check whether the username already exists or not

function RegisterNewUser({user,setUser}) {
  const { userName, setUserName } = useContext(UserNameContext);
  const [error, setError] = useState();
  const [regUserName, setRegUserName] = useState();
  const [successmsg, setSuccessmsg] = useState();
  const [isEnabled, setIsEnabled] = useState(true);
  const handleRegister = async () => {
    const isValidUserName = validateUsername(regUserName);
    if (!isValidUserName) {
      setError(properties.invalidUsernameMsg);
      return;
    }
    try {
      const response = await getRegisterStatus(regUserName);

      if (response.status !== 200) {
        setError(response.data.message);
      } else {
        setSuccessmsg(properties.successfulUserName);
        setIsEnabled(false);
        setError(null);
        setUserName(regUserName);
        setUser(regUserName)
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="main-container">
      <div className="registeruser-inner-container">
        <div>
          <img
            src="https://static.wixstatic.com/media/39e826_73a6db320f65402a8ad3812ee3f05b30~mv2.png/v1/fill/w_818,h_116,al_c,lg_1,q_85,enc_auto/Logo_e37135_text%20on%20white.png"
            alt="Logo"
            className="logo"
          />
        </div>
        <div className="input-fields-container">
          <div className="userName-field-container">
            <div>
              <UserNameInput
                type="text"
                label="Username"
                name="username"
                value={regUserName}
                error={error}
                isValid={!error && successmsg ? true : false}
                successMsg={successmsg}
                onChange={(event) => setRegUserName(event.target.value)}
              />
            </div>
            <div className="check-avail-button-div">
              <button
                className="check-avail-button"
                onClick={() => handleRegister()}
              >
                Check Availability
              </button>
            </div>
          </div>
          <div>
            <SignUp isEnabled={isEnabled} user={user}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterNewUser;
