import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useCartStore } from "@/features/cart/store/useCartStore";

import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductQuickView = ({ open, onOpenChange, product }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  if (!product) return null;

  const productImage = product.image || product.images?.[0] || "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="glass max-h-[100dvh] overflow-y-auto rounded-t-[2rem] border border-white/10 p-0 sm:max-w-5xl"
      >
        <div className="grid gap-0 lg:grid-cols-2">
          {/* image */}
          <div className="relative overflow-hidden">
            <img
              src={productImage}
              alt={product.title}
              className="h-[260px] w-full object-cover sm:h-[350px] lg:h-full"
            />
          </div>

          {/* content */}
          <div className="space-y-5 p-4 sm:p-8">
            <DialogHeader className="space-y-4 text-left">
              <div className="inline-flex w-max rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                {product.category}
              </div>

              <DialogTitle className="text-2xl font-black leading-tight sm:text-3xl">
                {product.title}
              </DialogTitle>

              <p className="leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </DialogHeader>

            {/* rating */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-sm text-muted-foreground">4.9 (120 Reviews)</p>
            </div>

            {/* price */}
            <div className="space-y-2">
              <h2 className="text-4xl font-black">₹{product.price}</h2>

              <p
                className={`text-sm font-medium ${
                  product.stock > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} items available`
                  : "Out of stock"}
              </p>
            </div>

            {/* actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                disabled={product.stock <= 0}
                className="h-12 flex-1 rounded-2xl text-base font-semibold"
                onClick={() => addToCart(product)}
              >
                {product.stock <= 0 ? "Out Of Stock" : "Add To Cart"}
              </Button>

              <Button
                variant="outline"
                disabled={product.stock <= 0}
                className="h-12 rounded-2xl border-white/10"
                onClick={() => {
                  addToCart(product);

                  onOpenChange(false);

                  navigate("/checkout");
                }}
              >
                Buy Now
              </Button>
            </div>

            {/* features */}
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {["Premium Quality", "Fast Delivery", "Secure Payment"].map(
                (item) => (
                  <div
                    key={item}
                    className="glass rounded-2xl border border-white/10 p-4 text-center text-sm font-medium"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
