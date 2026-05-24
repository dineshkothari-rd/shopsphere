import { ADMIN_SIDEBAR_LINKS } from "@/constants/sidebar-links";

import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden w-72 border-r bg-background lg:block">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <nav className="space-y-2 p-4">
        {ADMIN_SIDEBAR_LINKS.map((link) => {
          const Icon = link.icon;

          const active = location.pathname === link.href;

          return (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5" />

              <span>{link.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
