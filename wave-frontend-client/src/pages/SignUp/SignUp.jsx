import React, { useState, useContext } from "react";
import { signUpUser } from "../../api/signupuserapi";
import {
  validatePassword,
  validateEmailId,
} from "../../validation/validateInputs";
import Input from "../../components/Input";
import { properties } from "../../properties/properties";
import "../SignUp/signup.css";
import { useNavigate } from "react-router-dom";
import { EmailIdContext } from "../../context/EmailIdContext";
import AppHeader from "../../components/AppHeader/AppHeader";
import FullWidthTextField from "../../components/FullWidthTextField";
import { TextField } from "@mui/material";

function SignUp({ userName, isEnabled, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { emailId, setEmailId } = useContext(EmailIdContext);

  const validateForm = () => {
    const emailError = validateEmailId(email) ? "" : properties.invalidEmailId;
    const passwordError = validatePassword(password)
      ? ""
      : properties.invalidPassword;
    const confirmPasswordError =
      confirmPassword.length > 0 && confirmPassword === password
        ? ""
        : properties.passwordNotMatch;

    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    return (
      emailError === "" && passwordError === "" && confirmPasswordError === ""
    );
  };

  const validateEmail = (e) => {
    const emailError = validateEmailId(email) ? "" : properties.invalidEmailId;
    setError(emailError)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert(email);
    if (validateForm()) {
      // submit form
      // You can now use `email`, `password`, and `confirmPassword` here
      // await signUpUser(email, password); // Uncomment this line when ready
      try {
        const signUpResponse = await signUpUser(user, email, password);
        console.log(signUpResponse);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
        setEmailId(email);
        navigate("/profile/");
      } catch (err) {
        setErrors({ serverError: properties.errorMsg });
      }
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
                label="Username"
                id="loginusername"
                maxWidth="100%"
                borderRadius="10px"
                size="small"
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
                onBlur={(e) => validateEmail(e)}
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
