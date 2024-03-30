import React from "react";
import { Link } from "react-router-dom";
import keypad_icon from "../assets/images/numeric-keypad.png";
import "../assets/css/RegisterLogin.css";

const Otp = () => {
  return (
    <div className="container-register-login">
      <div className="submit-container top-container">
        <h2>Enter OTP</h2>
      </div>
      <div className="card-text">
        <p>Enter the OTP</p>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={keypad_icon} alt="" />
          <input type="text" placeholder="Enter OTP" />
        </div>
      </div>
      <div className="submit-container button-container">
        <div className="submit button">Submit Now</div>
      </div>
      <div className="back-to-login">
        <Link to="/login">
          <span>&#8592; </span>Back to Login
        </Link>
      </div>
    </div>
  );
};

export default Otp;
