import React from "react";
import "../components/general.css";

function UserNameInput({ label, type, name, value, onChange, error, isValid, successMsg }) {
  return (
    <div className="reg-input-field">
      <div><label htmlFor={name}>{label}</label></div>
      <div><input type={type} id={name} value={value} onChange={onChange} /></div>
      {!isValid && error && <p className="error">{error}</p>}
      {isValid && <p className="success">{successMsg}</p>}
    </div>
  );
}

export default UserNameInput;
