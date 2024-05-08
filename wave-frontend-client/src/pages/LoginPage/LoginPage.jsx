import React from "react";
import { useState, useContext } from "react";
import Input from "../../components/Input";
import { loginUserResponse } from "../../api/loginapi";
import { properties } from "../../properties/properties";
import { useNavigate } from "react-router-dom";
import "../LoginPage/loginpage.css";
import { UserNameContext } from "../../context/UserNameContext";
import AppHeader from "../../components/AppHeader/AppHeader";
import FullWidthTextField from "../../components/FullWidthTextField";
import { Link } from "react-router-dom";

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
      setError(properties.errorMsg);
    }
  };

  return (
    <>
      <AppHeader />
      <div className="login-container">
        <div className="inputfields-container">
          <div className="log-into-ur-acc">
            <h2>Log Into your account</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="text-fields-div">
              <FullWidthTextField
                label="Username/Email"
                id="loginusername"
                width={500}
                maxWidth="100%"
                borderRadius="10px"
              />
              <FullWidthTextField
                label="Password"
                id="loginusername"
                width={500}
                maxWidth="100%"
                borderRadius="10px"
              />
            </div>
            <div>
              <div className="login-questions-div">
                <div>
                  <Link to="/signup">Don't have an account?</Link>
                </div>
                <div>
                  <Link to="/forgotPwd">Trouble signing in?</Link>
                </div>
              </div>
            </div>
            <div className="login-button-div" style={{ padding: 10 }}>
              <button className='login-button' type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
