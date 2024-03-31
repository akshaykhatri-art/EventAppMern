import React from "react";
import {
  Link,
  Form,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import keypad_icon from "../assets/images/numeric-keypad.png";
import "../assets/css/RegisterLogin.css";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  debugger;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const email = localStorage.getItem("email");
    const otp = data.otp;

    data.email = email;
    data.otp = otp;

    const response = await customFetch.post("/auth/verify-otp", data);
    if (response.data.message === "OTP verified successfully") {
      const { token } = response.data;
      localStorage.setItem("token", token);
      toast.success(response.message || "OTP verified successfully");
      return redirect("/");
    } else {
      toast.error(response.message || "OTP verification failed");
      return { redirectToOTPPage: true, email: data.email };
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "An error occurred");
    return { redirectToOTPPage: true, email: data.email };
  }
};

const Otp = () => {
  return (
    <Form method="post">
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
            <input type="text" name="otp" placeholder="Enter OTP" />
          </div>
        </div>
        <div className="submit-container button-container">
          <button type="submit" className="submit button">
            Submit Now
          </button>
        </div>
        <div className="back-to-login">
          <Link to="/login">
            <span>&#8592; </span>Back to Login
          </Link>
        </div>
      </div>
    </Form>
  );
};

export default Otp;
