import { Navigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import { authContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { logged_in_user, get_login_user } = useContext(authContext);

  useEffect(() => {
    get_login_user();
  }, []);

  if (!logged_in_user) {
    return <div>loading....</div>;
  }

  if (logged_in_user.role !== "admin") {
    return <Navigate to="/not-found" />;
  }

  return children;
}
