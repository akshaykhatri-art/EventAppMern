import React from "react";
import { Link } from "react-router-dom";
import email_icon from "../assets/images/email.png";
import "../assets/css/RegisterLogin.css";

const ForgotPassword = () => {
  return (
    <div className="container-register-login">
      <div className="submit-container top-container">
        <h2>Forgot Password?</h2>
      </div>
      <div className="card-text">
        <p>No Worries we'll send you reset instructions</p>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" />
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

export default ForgotPassword;
