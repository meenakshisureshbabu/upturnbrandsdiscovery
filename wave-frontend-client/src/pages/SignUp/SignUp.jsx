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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PasswordStrengthBar from "react-password-strength-bar";

function SignUp({ user, setUser }) {
  const { state } = useLocation();
  console.log(state);
  const userName = state.userName;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [error, setError] = useState();
  const [emailError, setEmailError] = useState();
  const [pwdError, setPwdError] = useState();
  const [confnPwdError, setConfnPwdError] = useState();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPwdRef = useRef();
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleClickShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };

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
      const signUpResponse = await signUpUser(
        userName,
        email,
        password,
        firstName,
        lastName
      );
      console.log(signUpResponse);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setConfirmPassword("");
      setError();
      setUser(userName);
      navigate("/home/");
    } catch (err) {
      setError(properties.errorMsg);
    }
  };

  return (
    <>
      <AppHeader />
      <div className="signup-main-container">
        <div className="signup-image-div">
          <p style={{ fontSize: "2rem" }}>Hi, {userName}</p>
        </div>
        <div className="signup-form-div">
          <form onSubmit={handleSubmit}>
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {visiblePassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
            <PasswordStrengthBar password={password} scoreWords={['Too short','Weak','Better','Good','Strong']} style={{}}/>
            <div className="create-acct-but-div">
              {/* Submit button */}
              <button className="create-account-button" type="submit">
                Signup
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
