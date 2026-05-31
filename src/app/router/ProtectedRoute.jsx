import { Navigate, useLocation } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const loading = useAuthStore((state) => state.loading);
  const user = useAuthStore((state) => state.user);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
