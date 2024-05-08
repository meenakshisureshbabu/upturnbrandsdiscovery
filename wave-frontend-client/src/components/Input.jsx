import React from "react";
import "../components/general.css";

function Input({ label, type, name, value, onChange, error, isEnabled }) {
  return (
    <>
    <div className="input-field">
      <div className="label-container">
        <label htmlFor={name}>{label}:</label>
      </div>
      <div className="input-container">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          disabled={isEnabled}
        />
      </div>
      {/* {error && <p className="error">{error}</p>} */}
    </div>
   
    </>
  );
}

export default Input;
