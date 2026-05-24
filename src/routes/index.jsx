import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";

import HomePage from "@/pages/customer/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminProductsPage from "@/pages/admin/AdminProductsPage";
import ProductsPage from "@/pages/customer/ProductsPage";
import CheckoutPage from "@/pages/customer/CheckoutPage";
import OrdersPage from "@/pages/customer/OrdersPage";
import AdminOrdersPage from "@/pages/admin/AdminOrdersPage";
import ProductDetailsPage from "@/pages/customer/ProductDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "orders",
        element: <AdminOrdersPage />,
      },
    ],
  },
]);
