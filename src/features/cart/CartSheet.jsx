import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import { ShoppingCart } from "lucide-react";

import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CartSheet = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />

          {cartItems.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-xl border p-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 rounded-lg object-cover"
                  />

                  <div className="flex-1 space-y-2">
                    <h3 className="line-clamp-1 font-medium">{item.title}</h3>

                    <p className="text-sm text-muted-foreground">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </Button>

                      <span>{item.quantity}</span>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total</span>

                  <span>₹{total.toFixed(2)}</span>
                </div>

                <Button
                  className="mt-4 w-full"
                  onClick={() => {
                    setOpen(false);

                    navigate("/checkout");
                  }}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
