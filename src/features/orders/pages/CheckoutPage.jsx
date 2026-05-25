import { useState } from "react";

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

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      await createOrder({
        userId: user.uid,
        userEmail: user.email,
        name,
        phone,
        items: cartItems,
        address,
        total,
      });

      clearCart();

      toast.success("Order placed successfully");

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-8 sm:py-10">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      <Container className="relative">
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_420px]">
          <div className="glass premium-shadow space-y-6 rounded-[2rem] border border-white/10 p-5 sm:p-8">
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Checkout
            </h1>
            <Input
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-14 rounded-2xl border-white/10 bg-background/50"
            />

            <Input
              placeholder="Enter contact number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-14 rounded-2xl border-white/10 bg-background/50"
            />
            <Input
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-14 rounded-2xl border-white/10 bg-background/50"
            />

            <Button
              className="h-14 w-full rounded-2xl text-base font-semibold"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing order..." : "Place Order"}
            </Button>
          </div>

          <div className="glass premium-shadow h-fit space-y-5 rounded-[2rem] border border-white/10 p-5 sm:p-8 lg:sticky lg:top-28">
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

            <div className="border-t border-white/10 pt-5 text-2xl font-black">
              Total: ₹{total.toFixed(2)}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
