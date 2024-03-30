import React from "react";
import { Link } from "react-router-dom";
import password_icon from "../assets/images/password.png";
import "../assets/css/RegisterLogin.css";

const SetNewPassword = () => {
  return (
    <div className="container-register-login">
      <div className="submit-container top-container">
        <h2>Set New Password?</h2>
      </div>
      <div className="card-text">
        <p>Your new password must be different to previously used passwords</p>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="New Password" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Confirm Password" />
        </div>
      </div>
      <div className="submit-container button-container">
        <div className="submit button">Reset Password</div>
      </div>
      <div className="back-to-login">
        <Link to="/login">
          <span>&#8592; </span>Back to Login
        </Link>
      </div>
    </div>
  );
};

export default SetNewPassword;
