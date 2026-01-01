import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/users/Register";
import Login from "../pages/users/Login";
import Example from "../pages/posts/Example";
import Profile from "../componments/Profile";
import Layout from "../componments/Layout";
import Posts from "../componments/Posts";
import AdminPannel from "../admins/AdminPannel";
import UserLists from "../admins/UserLists";
import ProtectedRoute from "../utils/ProtectedRoutes";
import NotFound from "../componments/NotFound";

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
    element: <Example />,
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <AdminPannel />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "users",
        element: <UserLists />,
      },
    ],
  },

  {
    path: "/not-found",
    element: <NotFound />,
  },
]);

export default router;
