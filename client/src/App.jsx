import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  ForgotPassword,
  HomeLayout,
  Login,
  Otp,
  Register,
  SetNewPassword,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as verifyOTPAction } from "./pages/Otp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-otp",
    element: <Otp />,
    action: verifyOTPAction,
  },
  {
    path: "/set-new-password",
    element: <SetNewPassword />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
