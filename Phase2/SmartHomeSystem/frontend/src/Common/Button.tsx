import React from "react";
import "./Button.css";
const Button = (props: any) => {
  return <button className="common-btn">{props.text}</button>;
};

export default Button;
