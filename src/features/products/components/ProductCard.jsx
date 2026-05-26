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
  const [adding, setAdding] = useState(false);
  const [openQuickView, setOpenQuickView] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const user = useAuthStore((state) => state.user);

  const { wishlist } = useWishlist();

  const wishlistItem = wishlist.find((item) => item.productId === product.id);

  const isWishlisted = !!wishlistItem;

  const discountPercentage =
    product.comparePrice > product.price
      ? Math.round(
          ((product.comparePrice - product.price) / product.comparePrice) * 100,
        )
      : 0;

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
          y: -4,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <Card className="glass premium-shadow overflow-hidden rounded-[1.5rem] border border-white/10 transition-all duration-300">
          <Link to={`/products/${product.id}`}>
            <div className="relative aspect-[4/4.2] overflow-hidden bg-muted sm:aspect-square">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
                {discountPercentage > 0 && (
                  <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    {discountPercentage}% OFF
                  </span>
                )}

                {product.isNew && (
                  <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    NEW
                  </span>
                )}

                {product.isTrending && (
                  <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    TRENDING
                  </span>
                )}
              </div>
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
              {product.stock <= 0 && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <span className="rounded-full bg-red-500 px-5 py-2 text-sm font-bold text-white">
                    Out Of Stock
                  </span>
                </div>
              )}
              <Button
                onClick={(e) => {
                  e.stopPropagation();

                  e.preventDefault();
                  handleWishlist();
                }}
                className="absolute right-3 top-3 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-black/70"
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
                className="absolute bottom-3 right-3 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-black/70"
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
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black sm:text-lg">
                      ₹{product.price}
                    </span>

                    {product.comparePrice > product.price && (
                      <span className="text-xs text-muted-foreground line-through sm:text-sm">
                        ₹{product.comparePrice}
                      </span>
                    )}
                  </div>

                  {product.stock > 0 && product.stock <= 5 && (
                    <span className="text-xs font-medium text-orange-500">
                      Only {product.stock} left
                    </span>
                  )}
                </div>

                <span className="truncate rounded-full border border-white/10 bg-secondary/60 px-3 py-1 text-xs backdrop-blur-xl">
                  {product.category}
                </span>
              </div>
            </CardContent>
          </Link>

          <div className="p-3 pt-0 sm:px-4 sm:pb-4">
            <Button
              disabled={adding || product.stock <= 0}
              className="h-10 w-full rounded-xl text-sm font-semibold sm:h-11"
              onClick={() => {
                setAdding(true);

                addToCart(product);

                setTimeout(() => {
                  setAdding(false);
                }, 500);
              }}
            >
              {product.stock <= 0 ? "Out Of Stock" : "Add To Cart"}
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
