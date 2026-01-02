import { Navigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import { authContext } from "../context/AuthContext";

export default function ProtectedAdminPannel({ children }) {
  const { user, getUser } = useContext(authContext);

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return <div>loading....</div>;
  }

  if (user.role !== "admin") {
    return <Navigate to="/not-found" />;
  }

  return children;
}
