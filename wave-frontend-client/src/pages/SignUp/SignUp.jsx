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

function SignUp({ userName, isEnabled,user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      // submit form
      // You can now use `email`, `password`, and `confirmPassword` here
      // await signUpUser(email, password); // Uncomment this line when ready
      try {
        const signUpResponse = await signUpUser(user, email, password);
        console.log(signUpResponse)
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
    <div className="signup-main-container">
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          error={errors.email}
          onChange={(event) => setEmail(event.target.value)}
          isEnabled={isEnabled}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
          isEnabled={isEnabled}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          error={errors.confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          isEnabled={isEnabled}
        />
        <button type="submit" disabled={isEnabled}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
