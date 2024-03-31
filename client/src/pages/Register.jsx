import React, { useState } from "react";
import { Form, redirect, Link } from "react-router-dom";
import user_icon from "../assets/images/person.png";
import email_icon from "../assets/images/email.png";
import password_icon from "../assets/images/password.png";
import "../assets/css/RegisterLogin.css";

import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful Now Login!");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Form method="post">
      <div className="container-register-login">
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
            <input type="text" name="username" placeholder="Username" />
          </div>
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" name="email" placeholder="Email" />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" name="password" placeholder="Password" />
          </div>
        </div>

        <div className="submit-container button-container">
          <button type="submit" className="submit button">
            Register
          </button>
        </div>
      </div>
    </Form>
  );
};

export default Register;
