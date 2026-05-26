import { Link, useLocation } from "react-router-dom";

import { useState } from "react";

import { Menu, ExternalLink } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import { ADMIN_SIDEBAR_LINKS } from "@/constants/sidebar-links";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "@/features/auth/services/auth.service";

import { LogOut } from "lucide-react";

const SidebarContent = ({ pathname, onNavigate, onLogout }) => {
  return (
    <>
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <h1 className="gradient-text text-2xl font-black">Admin Panel</h1>
      </div>

      <nav className="space-y-2 p-4">
        <Link
          to="/"
          onClick={onNavigate}
          className="mb-4 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-primary transition hover:bg-primary/20"
        >
          <ExternalLink className="h-5 w-5" />

          <span className="font-medium">Visit Store</span>
        </Link>
        {ADMIN_SIDEBAR_LINKS.map((link) => {
          const Icon = link.icon;

          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${
                active
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "hover:bg-white/5"
              }`}
              onClick={onNavigate}
            >
              <Icon className="h-5 w-5" />

              <span className="font-medium">{link.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4">
        <Button
          variant="outline"
          onClick={onLogout}
          className="h-12 w-full justify-start rounded-2xl border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </>
  );
};

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();

      setOpen(false);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* mobile navbar */}
      <div className="glass sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 px-4 lg:hidden">
        <h1 className="gradient-text text-2xl font-black">Admin</h1>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="rounded-xl border-white/10"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="glass border-white/10 p-0"
          >
            <SidebarContent
              pathname={location.pathname}
              onNavigate={() => setOpen(false)}
              onLogout={handleLogout}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* desktop sidebar */}
      <aside className="glass premium-shadow fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 lg:block">
        <SidebarContent pathname={location.pathname} />
      </aside>
    </>
  );
};

export default AdminSidebar;
