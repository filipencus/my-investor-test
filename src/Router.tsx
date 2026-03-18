// src/app/router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./features/Home/pages/Home";
import PortfolioPage from "./features/Portfolio/pages/Portfolio";
import RootLayout from "./components/layout/Layout";
import NotFound from "./components/not-found/NotFound";
import FundsPage from "./features/Funds/pages/funds-list/Funds";
import FundsDetailsPage from "./features/Funds/pages/funds-details/FundsDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "/home", element: <HomePage /> },
      { path: "/funds", element: <FundsPage /> },
      { path: "/funds/:fundId", element: <FundsDetailsPage /> },
      { path: "/portfolio", element: <PortfolioPage /> },
    ],
  },
]);
