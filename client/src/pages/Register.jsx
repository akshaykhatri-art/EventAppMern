import React from "react";
import { Link } from "react-router-dom";
import user_icon from "../assets/images/person.png";
import email_icon from "../assets/images/email.png";
import password_icon from "../assets/images/password.png";
import "../assets/css/RegisterLogin.css";

const Register = () => {
  // return (
  //   <div>
  //     <h1>Register</h1>
  //     <Link to="/login">Login Page</Link>
  //   </div>
  // );
  return (
    <div className="container">
      <div className="header">
        <div className="text">Register</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder="Username" />
        </div>
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
        Lost Password? <span>Click Here!</span>
      </div>
      <div className="submit-container">
        <div className="submit">Register</div>
        <div className="submit">Login</div>
      </div>
      <Link to="/login">Login Page</Link>
    </div>
  );
};

export default Register;
