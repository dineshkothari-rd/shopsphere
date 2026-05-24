import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/store/useAuthStore";

const AdminRoute = ({ children }) => {
  const loading = useAuthStore((state) => state.loading);

  const user = useAuthStore((state) => state.user);

  const userData = useAuthStore((state) => state.userData);

  console.log("lkasjdlaksd", { user, userData });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // important fix
  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Fetching user data...
      </div>
    );
  }

  if (userData.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
