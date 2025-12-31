import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "../pages/users/Register";
import Login from "../pages/users/Login";
import Test from "../pages/posts/Test";
import GetPosts from "../pages/posts/GetPosts";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/posts",
        element: <GetPosts />,
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
