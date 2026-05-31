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
  UserRound,
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
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-black tracking-tight sm:text-2xl"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            S
          </span>
          <span>ShopSphere</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/80 p-1 md:flex">
          {userData?.role === "admin" && (
            <Link
              to="/admin"
              className="rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-secondary"
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/products"
            className="rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-secondary"
          >
            Products
          </Link>
          {user && (
            <>
              <Link
                to="/orders"
                className="rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-secondary"
              >
                Orders
              </Link>
              <Link to="/wishlist" className="relative">
                <span className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-secondary">
                  <Heart className="h-5 w-5" />
                </span>

                {wishlist.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </>
          )}
          {user && <CartSheet />}

        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />

          {user ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="h-10 rounded-full"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
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
        <div className="flex items-center gap-2 md:hidden">
          {user && (
            <>
              <Link to="/wishlist" className="relative">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card">
                  <Heart className="h-5 w-5" />
                </span>

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
                className="mobile-tap rounded-xl border-border/70 bg-card"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="w-[320px] border-border/70 bg-card p-0"
            >
              <div className="flex h-full flex-col">
                <div className="border-b border-border/70 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-lg font-black text-primary-foreground">
                      S
                    </span>

                    <div>
                      <h2 className="text-2xl font-black">ShopSphere</h2>

                      <p className="text-sm text-muted-foreground">
                        Modern ecommerce
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-2 p-4">
                  {userData?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-4 transition ${
                        location.pathname.startsWith("/admin")
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                    >
                      <LayoutDashboard className="h-5 w-5" />

                      <span className="font-medium">Dashboard</span>
                    </Link>
                  )}
                  <Link
                    to="/products"
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-4 transition ${
                      location.pathname === "/products"
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
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
                        className={`flex items-center gap-3 rounded-xl px-4 py-4 transition ${
                          location.pathname === "/orders"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-secondary"
                        }`}
                      >
                        <Package className="h-5 w-5" />

                        <span className="font-medium">Orders</span>
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-4 py-4 transition ${
                          location.pathname === "/wishlist"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-secondary"
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
                  {!user && (
                    <div className="rounded-xl border border-border/70 bg-secondary/50 p-4">
                      <UserRound className="mb-3 h-5 w-5 text-primary" />
                      <p className="text-sm font-semibold">Sign in to save products and track orders.</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-border/70 p-4">
                  {user ? (
                    <Button
                      onClick={() => {
                        setOpen(false);

                        handleLogout();
                      }}
                      className="h-12 w-full rounded-xl bg-red-500 text-white hover:bg-red-600"
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button
                        variant="outline"
                        asChild
                        className="h-12 rounded-xl"
                      >
                        <Link to="/login" onClick={() => setOpen(false)}>
                          Login
                        </Link>
                      </Button>

                      <Button asChild className="h-12 rounded-xl">
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
