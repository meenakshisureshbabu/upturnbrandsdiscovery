import React from "react";
import { useState, useContext } from "react";
import { loginUserResponse } from "../../api/loginapi";
import { properties } from "../../properties/properties";
import { useNavigate } from "react-router-dom";
import "../LoginPage/loginpage.css";
import { UserNameContext } from "../../context/UserNameContext";
import AppHeader from "../../components/AppHeader/AppHeader";
import FullWidthTextField from "../../components/FullWidthTextField";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

function LoginPage({ user, setUser }) {
  const { userName, setUserName } = useContext(UserNameContext);
  const [email, setEmail] = useState("");
  const [userNameEntered, setUserNameEntered] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    // submit form
    // You can now use `email`, `password`, and `confirmPassword` here
    // await signUpUser(email, password); // Uncomment this line when ready
    try {
      const loginResponse = await loginUserResponse(userNameEntered, password);
      setEmail("");
      setPassword("");
      setUserName(userNameEntered);
      setUser(userNameEntered);
      navigate("/home/");
    } catch (err) {
      setError(properties.loginErrorMsg);
    }
  };

  return (
    <>
      <AppHeader />
      <div className="login-container">
        <div className="log-into-ur-acc">
          <h2>Sign in</h2>
        </div>
        <div className="login-account-form-div">
          <form onSubmit={handleSubmit}>
            <div className="text-fields-div">
              <TextField
                label="Username/Email"
                id="loginusername"
                onChange={(e) => setUserNameEntered(e.target.value)}
                width={500}
                maxWidth="100%"
                borderRadius="10px"
                sx={{ input: { color: 'white' },backgroundColor:'lightgray' }}
              />
              <TextField
                label="Password"
                id="loginusername"
                width={500}
                onChange={(e) => setPassword(e.target.value)}
                maxWidth="100%"
                borderRadius="10px"
                type="password"
                sx={{ input: { color: 'white' },backgroundColor:'lightgray' }}
              />
            </div>
            <div>
              <div className="login-questions-div">
                <div>
                  <Link to="/forgotPwd">
                    <p style={{ color: "rgb(78, 143, 235)" }}>
                      Forgot Password
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="login-button-div" style={{ padding: 10 }}>
              <div>
                <Link to="/register">
                  <p style={{ color: "rgb(78, 143, 235)" }}>Create account</p>
                </Link>
              </div>
              <div>
                <button className="login-button" type="submit">
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          {error && (
            <p className="error" style={{ color: "red" }}>
              *{error}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginPage;
