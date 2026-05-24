import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
