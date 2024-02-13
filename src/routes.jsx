import { createBrowserRouter } from "react-router-dom";
import {
  FundAccountPage,
  HomePage,
  TransactionsPage,
} from "./components/pages";

import App from "./App";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true, // This denotes the root route of this group
        element: <HomePage />,
      },
      {
        path: "accounts",
        element: <FundAccountPage />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
    ],
  },
]);
