import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";

import { AuthProvider } from "./context/AuthProvider";
import { SettingsProvider } from "./context/SettingsProvider";
import "./index.css";
import { router } from "./routes/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <RouterProvider router={router} />
      </SettingsProvider>
    </AuthProvider>
  </React.StrictMode>,
);
