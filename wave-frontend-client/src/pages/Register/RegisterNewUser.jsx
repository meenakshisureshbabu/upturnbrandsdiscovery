import React, { useContext, useState } from "react";
import { useRef } from "react";
import { getRegisterStatus } from "../../api/registerapi";
import SignUp from "../SignUp/SignUp";
import { validateUsername } from "../../validation/validateInputs";
import { properties } from "../../properties/properties";
import UserNameInput from "../../components/UserNameInput";
import "../Register/registernewuser.css";
import { UserNameContext } from "../../context/UserNameContext";
import AppHeader from "../../components/AppHeader/AppHeader";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { Link } from "react-router-dom";
import UsernameRules from "../../components/UsernameRules";
import { useNavigate } from "react-router-dom";

//Registering the user for the first time and check whether the username already exists or not

function RegisterNewUser({ user, setUser }) {
  const { userName, setUserName } = useContext(UserNameContext);
  const [error, setError] = useState();
  const [regUserName, setRegUserName] = useState();
  const [successmsg, setSuccessmsg] = useState();
  const navigate = useNavigate()
  const handleRegister = async () => {
    const isValidUserName = validateUsername(regUserName);
    if (!isValidUserName) {
      console.log(isValidUserName)
      setError(properties.invalidUsernameMsg);
      return;
    }
    try {
      const response = await getRegisterStatus(regUserName);

      if (response.status !== 200) {
        setError(response.data.message);
      } else {
        setError(null);
        setUserName(regUserName);
        navigate("/signup/");
        // setUser(regUserName);
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <AppHeader />
      <div className="main-container">
        <div className="registeruser-inner-container">
          <div className="styx-saying-div">
            <div className="all-your-services">
              <h2>All Your Services</h2>
            </div>
            <div className="at-one-place">
              <h2>At One Place</h2>
            </div>
          </div>
        </div>
        <div className="register-form-div">
          <div className="register-image-div">
            <img
              className="register-image"
              src="https://plus.unsplash.com/premium_photo-1661673910395-8e30e16c4343?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNpZ251cHxlbnwwfHwwfHx8MA%3D%3D"
              alt="logo"
            />
          </div>
          <div className="create-acc-outer-div">
            <div className="create-acc-inner-div">
              <div style={{ textAlign: "left", fontSize:'25px'}}><b>Create an Account</b></div>
              <div>
                <TextField
                  fullWidth
                  label="Username"
                  onChange={(event) => setRegUserName(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <ArrowCircleRightOutlinedIcon onClick={handleRegister} onKeyDown={(event) => event.key === 'Enter' && handleRegister()} style={{cursor:'pointer'}}/>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </div>
            </div>
            <div className="error-account-link-div">
              <div>{error && <p className="error" style={{color:'red'}}>*{error}</p>}</div>
              <div>
                <Link to="/login">Already have an account?</Link>
              </div>
            </div>
            <div>
              <UsernameRules/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterNewUser;
