import React from "react";
import { useState,useContext } from "react";
import Input from "../../components/Input";
import { loginUserResponse } from "../../api/loginapi";
import { properties } from "../../properties/properties";
import { useNavigate } from "react-router-dom";
import "../LoginPage/loginpage.css";
import { UserNameContext } from "../../context/UserNameContext";

function LoginPage({user,setUser}) {
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
      const loginResponse = await loginUserResponse(userNameEntered, email, password);
      setEmail("");
      setPassword("");
      setUserName(userNameEntered)
      setUser(userNameEntered)
      navigate("/home/");
    } catch (err) {
      setError(properties.errorMsg);
    }
  };

  return (
    <>
      <div className="login-container">
        <div>
          <img
            src="https://static.wixstatic.com/media/39e826_73a6db320f65402a8ad3812ee3f05b30~mv2.png/v1/fill/w_818,h_116,al_c,lg_1,q_85,enc_auto/Logo_e37135_text%20on%20white.png"
            alt="Logo"
            className="logo"
          />
        </div>
        <div className="inputfields-container">
          <form onSubmit={handleSubmit}>
            <div style={{padding:10}}>
              <Input
                label="Username"
                type="text"
                name="username"
                value={userNameEntered}
                error={error}
                onChange={(event) => setUserNameEntered(event.target.value)}
              />
            </div>
            <div style={{padding:10}}>
              <Input
                label="Password"
                type="password"
                name="password"
                value={password}
                error={error}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div style={{padding:10}}>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
