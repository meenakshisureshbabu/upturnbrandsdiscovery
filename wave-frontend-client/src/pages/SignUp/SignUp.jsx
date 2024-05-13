import React, { useState, useContext, useRef } from "react";
import { signUpUser } from "../../api/signupuserapi";
import {
  validatePassword,
  validateEmailId,
} from "../../validation/validateInputs";
import { properties } from "../../properties/properties";
import "../SignUp/signup.css";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


function SignUp() {
  const { state } = useLocation();
  const userName = state.userName;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState();
  const [emailError, setEmailError] = useState();
  const [pwdError, setPwdError] = useState();
  const [confnPwdError, setConfnPwdError] = useState();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPwdRef = useRef();
  const [visiblePassword,setVisiblePassword] = useState(false);

  const handleClickShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  }

  const validateEmail = () => {
    // const emailErrorMsg = validateEmailId(email) ? "" : properties.invalidEmailId;
    if (!validateEmailId(email)) {
      setEmailError(properties.invalidEmailId);
      emailRef.current.focus();
    } else {
      setEmailError("");
    }
  };

  const validatePwd = () => {
    // const emailErrorMsg = validateEmailId(email) ? "" : properties.invalidEmailId;
    if (!validatePassword(password)) {
      setPwdError(properties.invalidPassword);
      passwordRef.current.focus();
    } else {
      setPwdError("");
    }
  };

  const validateConfnPwd = () => {
    if (confirmPassword.length > 0 && confirmPassword === password) {
      setConfnPwdError("");
    } else {
      setConfnPwdError(properties.passwordNotMatch);
      //confirmPwdRef.current.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // submit form
    // You can now use `email`, `password`, and `confirmPassword` here
    // await signUpUser(email, password); // Uncomment this line when ready
    try {
      const signUpResponse = await signUpUser(userName, email, password);
      console.log(signUpResponse);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError();
      navigate("/home/");
    } catch (err) {
      setError(properties.errorMsg);
    }
  };

  return (
    <>
      <AppHeader />
      <div className="signup-main-container">
        <div className="signup-saying-image-div">
          <div className="signup-styx-saying-div">
            <div className="signup-all-your-services">
              <h2>All Your Services</h2>
            </div>
            <div className="signup-at-one-place">
              <h2>At One Place</h2>
            </div>
          </div>
          <div className="signup-image-div">
            <img
              className="signup-image"
              src="https://plus.unsplash.com/premium_photo-1661673910395-8e30e16c4343?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNpZ251cHxlbnwwfHwwfHx8MA%3D%3D"
              alt="logo"
            />
          </div>
        </div>
        <div className="signup-form-div">
          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: "left", fontSize: "25px" }}>
              <b>Create an Account</b>
              {/* Create an Account */}
            </div>
            <div>
              {/* Username */}
              <TextField
                fullWidth
                id="loginusername"
                maxWidth="100%"
                borderRadius="10px"
                size="small"
                value={userName}
                disabled
              />
            </div>
            <div style={{ display: "flex", gap: "1em" }}>
              <div style={{ width: "50%" }}>
                {/* First Name */}
                <TextField
                  label="First Name"
                  id="firstName"
                  fullWidth
                  borderRadius="10px"
                  size="small"
                />
              </div>
              <div style={{ width: "50%" }}>
                {" "}
                {/* Last Name */}
                <TextField
                  fullWidth
                  label="Last Name"
                  id="lastName"
                  borderRadius="10px"
                  size="small"
                />
              </div>
            </div>
            <div>
              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                id="emailId"
                width={750}
                maxWidth="100%"
                borderRadius="10px"
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                onBlur={validateEmail}
                helperText={emailError && emailError}
                FormHelperTextProps={{ sx: { color: "red" } }}
                inputRef={emailRef}
              />
            </div>
            <div>
              {/* Password */}
              <TextField
                fullWidth
                label="Password"
                id="password"
                width={750}
                maxWidth="100%"
                borderRadius="10px"
                size="small"
                onChange={(e) => setPassword(e.target.value)}
                type={visiblePassword ? "text" : "password"}
                onBlur={validatePwd}
                helperText={pwdError && pwdError}
                FormHelperTextProps={{ sx: { color: "red" } }}
                inputRef={passwordRef}
                InputProps={{endAdornment:(<InputAdornment position="end"><IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} >{visiblePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton></InputAdornment>) }}
              />
            </div>
            <div>
              {/* Confirm Password */}
              <TextField
                fullWidth
                label="Confirm Password"
                id="confirmPwd"
                width={750}
                maxWidth="100%"
                borderRadius="10px"
                size="small"
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={validateConfnPwd}
                type="password"
                helperText={confnPwdError && confnPwdError}
                FormHelperTextProps={{ sx: { color: "red" } }}
                inputRef={confirmPwdRef}
              />
            </div>
            <div className="create-acct-but-div">
              {/* Submit button */}
              <button className="create-account-button" type="submit">
                Create an Account
              </button>
            </div>
            <div>
              {error && (
                <p className="error" style={{ color: "red" }}>
                  *{error}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
