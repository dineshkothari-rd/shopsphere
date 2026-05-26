import { Link, useLocation, useNavigate } from "react-router-dom";

import Container from "@/components/shared/Container";
import ThemeToggle from "@/components/shared/ThemeToggle";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

import { logoutUser } from "@/features/auth/services/auth.service";
import { CartSheet } from "@/features/cart";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import {
  Heart,
  LogOut,
  Menu,
  Package,
  ShoppingBag,
  LayoutDashboard,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Navbar = () => {
  const userData = useAuthStore((state) => state.userData);
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const { wishlist } = useWishlist();

  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    try {
      await logoutUser();

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 px-2 py-3 sm:px-4">
      <Container className="glass premium-shadow flex h-16 items-center justify-between rounded-2xl border border-white/10 px-4 sm:px-6">
        <Link
          to="/"
          className="gradient-text text-2xl font-black tracking-tight sm:text-3xl"
        >
          ShopSphere
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          {userData?.role === "admin" && (
            <Link to="/admin" className="text-sm font-medium">
              Dashboard
            </Link>
          )}
          <Link to="/products" className="text-sm font-medium">
            Products
          </Link>
          {user && (
            <>
              <Link to="/orders" className="text-sm font-medium">
                Orders
              </Link>
              <Link to="/wishlist" className="relative">
                <Heart className="h-6 w-6" />

                {wishlist.length > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <CartSheet />
            </>
          )}

          <ThemeToggle />

          {user ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>

              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 md:hidden">
          {user && (
            <>
              <Link to="/wishlist" className="relative">
                <Heart className="h-5 w-5" />

                {wishlist.length > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <CartSheet />
            </>
          )}

          <ThemeToggle />

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
              className="glass w-[320px] border-white/10 p-0"
            >
              <div className="flex h-full flex-col">
                {/* top */}
                <div className="border-b border-white/10 p-6">
                  <h2 className="gradient-text text-3xl font-black">
                    ShopSphere
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Premium ecommerce experience
                  </p>
                </div>

                {/* nav */}
                <div className="flex-1 space-y-2 p-4">
                  {userData?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-4 transition ${
                        location.pathname.startsWith("/admin")
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <LayoutDashboard className="h-5 w-5" />

                      <span className="font-medium">Dashboard</span>
                    </Link>
                  )}
                  <Link
                    to="/products"
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-4 transition ${
                      location.pathname === "/products"
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <ShoppingBag className="h-5 w-5" />

                    <span className="font-medium">Products</span>
                  </Link>

                  {user && (
                    <>
                      <Link
                        to="/orders"
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-4 transition ${
                          location.pathname === "/orders"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-white/5"
                        }`}
                      >
                        <Package className="h-5 w-5" />

                        <span className="font-medium">Orders</span>
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between rounded-2xl px-4 py-4 transition ${
                          location.pathname === "/wishlist"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Heart className="h-5 w-5" />

                          <span className="font-medium">Wishlist</span>
                        </div>

                        {wishlist.length > 0 && (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            {wishlist.length}
                          </span>
                        )}
                      </Link>
                    </>
                  )}
                </div>

                {/* bottom */}
                <div className="border-t border-white/10 p-4">
                  {user ? (
                    <Button
                      onClick={() => {
                        setOpen(false);

                        handleLogout();
                      }}
                      className="h-12 w-full rounded-2xl bg-red-500 text-white hover:bg-red-600"
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button
                        variant="outline"
                        asChild
                        className="h-12 rounded-2xl"
                      >
                        <Link to="/login" onClick={() => setOpen(false)}>
                          Login
                        </Link>
                      </Button>

                      <Button asChild className="h-12 rounded-2xl">
                        <Link to="/register" onClick={() => setOpen(false)}>
                          Register
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
