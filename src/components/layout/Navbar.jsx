import { Link, useNavigate } from "react-router-dom";

import Container from "@/components/shared/Container";
import ThemeToggle from "@/components/shared/ThemeToggle";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/store/useAuthStore";

import { logoutUser } from "@/services/firebase/authMethods";
import CartSheet from "../cart/CartSheet";

const Navbar = () => {
  const navigate = useNavigate();

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
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          ShopSphere
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/products" className="text-sm font-medium">
            Products
          </Link>
          {user && (
            <>
              <Link to="/orders" className="text-sm font-medium">
                Orders
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
      </Container>
    </header>
  );
};

export default Navbar;
