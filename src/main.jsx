import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { PostContextProvider } from "./context/PostContext";
import { AuthContextProvider } from "./context/AuthContext";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
