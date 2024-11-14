import React from "react";
import "./style.css";

const Input = ({ label, value, name }) => {
  return (
    <div className="input_group">
      <div>
        <label className="input_label">{label}</label>
      </div>
      <div>
        <input
          className="input_field"
          id={name}
          name={name}
          value={value}
        ></input>
      </div>
    </div>
  );
};

export default Input;
