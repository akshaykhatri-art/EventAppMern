import React, { useState } from "react";
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

  const [action, setAction] = useState("Register");

  return (
    <div className="container-register-login">
      {/* <div className="header">
        <div className="text">Register</div>
        <div className="underline"></div>
      </div> */}

      <div className="submit-container top-container">
        <div className="submit">Register</div>
        <div className="submit">
          <Link className="link gray" to="/login">
            Login Page
          </Link>
        </div>
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
      <div className="submit-container button-container">
        <div className="submit button">Register</div>
      </div>
    </div>
  );
};

export default Register;
