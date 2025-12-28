import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/users/Register";
import Login from "../pages/users/Login";
import PostCreate from "../pages/posts/PostCreate";
import GetPosts from "../pages/posts/GetPosts";
import Home from "../pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/post-create",
        element: <PostCreate />,
      },
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
]);

export default router;
