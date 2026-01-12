import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/users/Register";
import Login from "../pages/users/Login";
import Profile from "../componments/Profile";
import Layout from "../componments/Layout";
import Posts from "../componments/Posts";
import AdminPannel from "../admins/AdminPannel";
import UserLists from "../admins/UserLists";
import ProtectedAdminPannel from "../utils/ProtectedAdminPannel";
import NotFound from "../componments/NotFound";
import ProtectedUserRoute from "../utils/ProtectedUserRoute";
import Example from "../componments/Example";
import TestingWithApiData from "../componments/TestingWithApiData";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedUserRoute>
        <Layout />
      </ProtectedUserRoute>
    ),
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
    path: "/dashboard",
    element: (
      <ProtectedAdminPannel>
        <AdminPannel />
      </ProtectedAdminPannel>
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

  {
    path: "/test",
    element: <Example />,
  },
  {
    path: "/test-with-api",
    element: <TestingWithApiData />,
  },
]);

export default router;
