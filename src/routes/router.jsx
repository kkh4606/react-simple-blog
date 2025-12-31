import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "../pages/users/Register";
import Login from "../pages/users/Login";
import Test from "../pages/posts/Test";
import Profile from "../componments/Profile";
import Layout from "../componments/Layout";
import Posts from "../componments/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Posts />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },
    ],
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
    path: "/test",
    element: <Test />,
  },
]);

export default router;
