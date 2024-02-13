import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./styles/index.css";
import { router } from "./routes.jsx";
import { FundProvider } from "./contexts/FundContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <FundProvider>
        <App />
      </FundProvider>
    </RouterProvider>
  </React.StrictMode>
);
