import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import { useCartStore } from "@/features/cart/store/useCartStore";

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

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* trigger */}
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="glass relative rounded-2xl border-white/10"
        >
          <ShoppingCart className="h-5 w-5" />

          {itemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      {/* sheet */}
      <SheetContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="glass flex w-full flex-col border-white/10 sm:max-w-lg"
      >
        {/* header */}
        <SheetHeader className="border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Shopping Cart
            </div>

            <div className="flex items-end justify-between">
              <div>
                <SheetTitle className="text-2xl font-black tracking-tight sm:text-4xl">
                  Your Cart
                </SheetTitle>

                <p className="mt-2 text-muted-foreground">
                  Review your selected products.
                </p>
              </div>

              <div className="glass rounded-2xl px-4 py-3">
                <p className="text-sm text-muted-foreground">Items</p>

                <h3 className="text-2xl font-black">{itemCount}</h3>
              </div>
            </div>
          </div>
        </SheetHeader>

        {/* content */}
        <div className="mt-6 flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="glass mb-6 flex h-28 w-28 items-center justify-center rounded-full text-3xl sm:text-4xl lg:text-5xl">
                🛒
              </div>

              <h2 className="text-3xl font-black">Your cart is empty</h2>

              <p className="mt-3 max-w-sm text-muted-foreground">
                Add premium products to start your shopping journey.
              </p>
            </div>
          ) : (
            <motion.div layout className="space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  className="glass premium-shadow flex gap-3 rounded-2xl border border-white/10 p-3"
                >
                  {/* image */}
                  <img
                    src={item.image || item.images?.[0]}
                    alt={item.title}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />

                  {/* content */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="line-clamp-1 text-lg font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* controls */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="glass flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 transition hover:scale-105"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="min-w-[24px] text-center font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="glass flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 transition hover:scale-105"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* delete */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 transition hover:bg-red-500/20"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* footer */}
        {cartItems.length > 0 && (
          <div className="glass premium-shadow mt-6 space-y-6 rounded-[2rem] border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <p className="text-lg text-muted-foreground">Total</p>

              <h2 className="text-2xl font-black sm:text-4xl">
                ₹{total.toFixed(2)}
              </h2>
            </div>

            <Button
              className="h-14 w-full rounded-2xl text-base font-semibold"
              onClick={() => {
                setOpen(false);

                navigate("/checkout");
              }}
            >
              Proceed To Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
