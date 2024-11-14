import React from "react";
import "./style.css";

const Input = ({ label, value, onChange, name }) => {
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
          onChange={(e) => onChange(e)}
        ></input>
      </div>
    </div>
  );
};

export default Input;
