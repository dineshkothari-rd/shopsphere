import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Container from "@/components/shared/Container";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCartStore } from "@/features/cart/store/useCartStore";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

import { toast } from "sonner";
import { createOrder } from "../services/order.service";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const authLoading = useAuthStore((state) => state.loading);

  const cartItems = useCartStore((state) => state.cartItems);

  const clearCart = useCartStore((state) => state.clearCart);

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState("");

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    if (!cartItems.length) {
      navigate("/products", { replace: true });
    }
  }, [authLoading, cartItems.length, navigate, user]);

  const handlePlaceOrder = async () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName || !trimmedPhone || !trimmedAddress) {
      toast.error("Please fill all delivery details");
      return;
    }

    if (!/^[0-9+\-\s()]{7,15}$/.test(trimmedPhone)) {
      toast.error("Please enter a valid contact number");
      return;
    }

    if (!user) {
      toast.error("Please login to place your order");
      navigate("/login", { replace: true });
      return;
    }

    try {
      setLoading(true);

      await createOrder({
        userId: user.uid,
        userEmail: user.email,
        name: trimmedName,
        phone: trimmedPhone,
        items: cartItems,
        address: trimmedAddress,
        total,
      });

      clearCart();

      toast.success("Order placed successfully");

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="page-shell">
      <Container>
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_420px]">
          <div className="app-surface space-y-6 rounded-2xl p-5 sm:p-8">
            <h1 className="page-title">
              Checkout
            </h1>
            <Input
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-14 rounded-xl border-border/70 bg-background/70"
            />

            <Input
              placeholder="Enter contact number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-14 rounded-xl border-border/70 bg-background/70"
            />
            <Input
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-14 rounded-xl border-border/70 bg-background/70"
            />

            <Button
              className="h-14 w-full rounded-2xl text-base font-semibold"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing order..." : "Place Order"}
            </Button>
          </div>

          <div className="app-surface h-fit space-y-5 rounded-2xl p-5 sm:p-8 lg:sticky lg:top-28">
            <h2 className="text-2xl font-black">Order Summary</h2>

            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p>{item.title}</p>

                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p>₹{item.price * item.quantity}</p>
              </div>
            ))}

            <div className="border-t border-border/70 pt-5 text-2xl font-black">
              Total: ₹{total.toFixed(2)}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
