import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./styles/index.css";
import { router } from "./routes.jsx";
import { FundProvider } from "./contexts/FundContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FundProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </FundProvider>
);
