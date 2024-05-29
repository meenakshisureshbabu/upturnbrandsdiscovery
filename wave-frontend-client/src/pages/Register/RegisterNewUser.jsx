import React, { useContext, useState } from "react";
import { getRegisterStatus } from "../../api/registerapi";
import { validateUsername } from "../../validation/validateInputs";
import { properties } from "../../properties/properties";
import "../Register/registernewuser.css";
import { UserNameContext } from "../../context/UserNameContext";
import AppHeader from "../../components/AppHeader/AppHeader";
import { Button, InputAdornment, TextField } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { Link } from "react-router-dom";
import UsernameRules from "../../components/UsernameRules";
import { useNavigate } from "react-router-dom";

//Registering the user for the first time and check whether the username already exists or not

function RegisterNewUser({ user, setUser }) {
  const { userName, setUserName } = useContext(UserNameContext);
  const [error, setError] = useState();
  const [regUserName, setRegUserName] = useState();
  const navigate = useNavigate();
  const handleRegister = async () => {
    const isValidUserName = validateUsername(regUserName);
    if (!isValidUserName) {
      console.log(isValidUserName);
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

        navigate("/signup", { state: { userName: regUserName } });
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
        <div className="registeruser-inner-container"></div>
        <div className="register-form-div">
          <div className="register-image-div">
            <h1>Welcome!</h1>
          </div>
          <div className="create-acc-outer-div">
            <div className="error-account-link-div">
              <TextField
                sx={{ input: { color: 'white' },backgroundColor:'lightgray' }}
                fullWidth
                label="Username"
                variant="filled"
                onChange={(event) => setRegUserName(event.target.value)}
                
              ></TextField>
              <div>
                {error && (
                  <p className="error" style={{ color: "red" }}>
                    *{error}
                  </p>
                )}
              </div>
              <div className="already-have-an-account-div">
                <Link to="/login"><p style={{color:'rgb(78, 143, 235)'}}>Already have an account?</p></Link>
              </div>
            </div>
            <div>
              <div className="next-button-div">
                <Button sx={{backgroundColor:'rgb(78, 143, 235)',color:'white',borderRadius:'10px'}} onClick={handleRegister}>Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterNewUser;
