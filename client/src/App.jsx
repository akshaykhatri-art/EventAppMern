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
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/otp",
    element: <Otp />,
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
