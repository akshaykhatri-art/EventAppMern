import React from "react";
import {
  Link,
  Form,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import email_icon from "../assets/images/email.png";
import password_icon from "../assets/images/password.png";
import "../assets/css/RegisterLogin.css";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  debugger;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = { msg: "" };
  if (data.password.length < 3) {
    errors.msg = "password too short";
    return errors;
  }

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return errors;
  }
};

const Login = () => {
  const errors = useActionData();
  const navigate = useNavigate();

  return (
    <Form method="post">
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
          {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" name="email" placeholder="Email" />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" name="password" placeholder="Password" />
          </div>
        </div>
        <div className="forgot-password">
          Lost Password?{" "}
          <span>
            <Link to="/forgot-password">Click Here!</Link>
          </span>
        </div>
        <div className="submit-container button-container">
          <button type="submit" className="submit button">
            Login
          </button>
        </div>
      </div>
    </Form>
  );
};

export default Login;
