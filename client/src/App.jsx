import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ForgotPassword, HomeLayout, Login, Register } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
