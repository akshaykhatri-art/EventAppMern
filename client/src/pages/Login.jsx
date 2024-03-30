import React from "react";
import { Link } from "react-router-dom";
import email_icon from "../assets/images/email.png";
import password_icon from "../assets/images/password.png";
import "../assets/css/RegisterLogin.css";

const Login = () => {
  return (
    <div className="container-register-login">
      <div className="submit-container top-container">
        <div className="submit">
          <Link className="link gray" to="/register">
            Register Page
          </Link>
        </div>
        <div className="submit">Login</div>
      </div>

      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className="forgot-password">
        Lost Password?{" "}
        <span>
          <Link to="/forgot-password">Click Here!</Link>
        </span>
      </div>
      <div className="submit-container button-container">
        <div className="submit button">Login</div>
      </div>
    </div>
  );
};

export default Login;
