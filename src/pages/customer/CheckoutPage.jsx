import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Container from "@/components/shared/Container";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";

import { createOrder } from "@/services/firebase/orderMethods";
import { toast } from "sonner";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const cartItems = useCartStore((state) => state.cartItems);

  const clearCart = useCartStore((state) => state.clearCart);

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState("");

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
    <section className="py-10">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 rounded-2xl border p-6">
            <h1 className="text-3xl font-bold">Checkout</h1>

            <Input
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <Button
              className="w-full"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing order..." : "Place Order"}
            </Button>
          </div>

          <div className="space-y-4 rounded-2xl border p-6">
            <h2 className="text-2xl font-semibold">Order Summary</h2>

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

            <div className="border-t pt-4 text-xl font-bold">
              Total: ₹{total.toFixed(2)}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
