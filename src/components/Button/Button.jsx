import React from "react";
import "./style.css";

const Button = ({ className, label, onClick, variant }) => {
  return (
    <div>
      <button className={`${className} ${variant}`} onClick={() => onClick()}>
        {label}
      </button>
    </div>
  );
};

export default Button;
