import { Outlet } from "react-router-dom";

import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />

      <main className="min-h-screen lg:ml-72">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
