import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "@/app/layouts/AdminLayout";
import MainLayout from "@/app/layouts/MainLayout";

import { ProductDetailsPage, ProductsPage } from "@/features/products";
import AdminProductsPage from "@/pages/admin/AdminProductsPage";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import AdminRoute from "./AdminRoute";
import { LoginPage, RegisterPage } from "@/features/auth";
import { AdminOrdersPage, CheckoutPage, OrdersPage } from "@/features/orders";
import { DashboardPage } from "@/features/dashboard";
import { ROUTES } from "@/constants/routes";
import WishlistPage from "@/features/wishlist/pages/WishlistPage";
import HomePage from "@/features/dashboard/pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.PRODUCTS,
        element: <ProductsPage />,
      },
      {
        path: `${ROUTES.PRODUCTS}/:id`,
        element: <ProductDetailsPage />,
      },
      {
        path: ROUTES.CHECKOUT,
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.ORDERS,
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.WISHLIST,
        element: (
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },

  {
    path: ROUTES.ADMIN,
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.ADMIN_PRODUCTS,
        element: <AdminProductsPage />,
      },
      {
        path: ROUTES.ADMIN_ORDERS,
        element: <AdminOrdersPage />,
      },
      {
        path: ROUTES.ADMIN_USERS,
        element: <AdminUsersPage />,
      },
    ],
  },
]);
