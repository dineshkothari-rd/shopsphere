import { Outlet } from "react-router-dom";

import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
