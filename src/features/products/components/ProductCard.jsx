import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useCartStore } from "@/features/cart/store/useCartStore";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { toast } from "sonner";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/services/wishlist.service";
import { Heart, Eye } from "lucide-react";
import { motion } from "framer-motion";

import ProductQuickView from "@/features/products/components/ProductQuickView";

import { useState } from "react";

const ProductCard = ({ product }) => {
  const [openQuickView, setOpenQuickView] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const user = useAuthStore((state) => state.user);

  const { wishlist } = useWishlist();

  const wishlistItem = wishlist.find((item) => item.productId === product.id);

  const isWishlisted = !!wishlistItem;

  const handleWishlist = async () => {
    if (!user) {
      return toast.error("Please login first");
    }

    try {
      if (isWishlisted) {
        await removeFromWishlist(wishlistItem.id);

        toast.success("Removed from wishlist");
      } else {
        await addToWishlist({
          userId: user.uid,

          productId: product.id,

          title: product.title,

          image: product.image,

          price: product.price,
        });

        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{
          y: window.innerWidth >= 1024 ? -6 : -2,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <Card className="glass premium-shadow overflow-hidden rounded-[1.5rem] border border-white/10 transition-all duration-300">
          <Link to={`/products/${product.id}`}>
            <div className="relative aspect-[4/4.2] overflow-hidden bg-muted sm:aspect-square">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
              <Button
                onClick={(e) => {
                  e.stopPropagation();

                  e.preventDefault();
                  handleWishlist();
                }}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-black/70"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : " text-white"
                  }`}
                />
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();

                  e.stopPropagation();

                  setOpenQuickView(true);
                }}
                className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-black/70"
              >
                <Eye className="h-5 w-5 text-white" />
              </Button>
            </div>

            <CardContent className="space-y-3 p-3 sm:p-4">
              <div>
                <h2 className="line-clamp-1 text-[15px] font-bold sm:text-base">
                  {product.title}
                </h2>

                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-base font-black sm:text-lg">
                  ₹{product.price}
                </span>

                <span className="truncate rounded-full border border-white/10 bg-secondary/60 px-3 py-1 text-xs backdrop-blur-xl">
                  {product.category}
                </span>
              </div>
            </CardContent>
          </Link>

          <div className="p-3 pt-0 sm:px-4 sm:pb-4">
            <Button
              className="h-10 w-full rounded-xl text-sm font-semibold sm:h-11"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </Button>
          </div>
        </Card>
      </motion.div>
      <ProductQuickView
        open={openQuickView}
        onOpenChange={setOpenQuickView}
        product={product}
      />
    </>
  );
};

export default ProductCard;
