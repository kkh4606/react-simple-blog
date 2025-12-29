import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import Home from "./pages/Home";
import { PostContextProvider } from "./context/PostContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PostContextProvider>
      <RouterProvider router={router}>
        <Home />
      </RouterProvider>
    </PostContextProvider>
  </StrictMode>
);
