import React from "react";

const ToggleButton = ({ toggleCallback, label }) => {
  return (
    <div className="toggle">
      <input type="checkbox" id="temp" onChange={toggleCallback} />
      <label htmlFor="temp">{label}</label>
    </div>
  );
};

export default ToggleButton;
