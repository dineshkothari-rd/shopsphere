import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Toaster } from "sonner";
import { ThemeProvider } from "./providers/ThemeProvider";
import { router } from "./routes";

import "./index.css";
import AuthProvider from "./providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
