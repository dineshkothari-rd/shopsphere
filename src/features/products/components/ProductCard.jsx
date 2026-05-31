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
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import ProductQuickView from "@/features/products/components/ProductQuickView";

import { useState } from "react";

const ProductCard = ({ product }) => {
  const productId = product.productId || product.id;
  const productImage = product.image || product.images?.[0] || "";
  const [adding, setAdding] = useState(false);
  const [openQuickView, setOpenQuickView] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const user = useAuthStore((state) => state.user);

  const { wishlist } = useWishlist();

  const wishlistItem = wishlist.find((item) => item.productId === productId);

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

          productId,

          title: product.title,

          image: productImage,

          price: product.price,

          description: product.description || "",

          category: product.category || "",

          stock: Number(product.stock || 0),

          comparePrice: Number(product.comparePrice || 0),

          images: product.images || (productImage ? [productImage] : []),

          isNew: !!product.isNew,

          isTrending: !!product.isTrending,
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
        <Card className="soft-card soft-card-hover overflow-hidden rounded-2xl">
          <Link to={`/products/${productId}`}>
            <div className="relative aspect-[4/4.2] overflow-hidden bg-muted sm:aspect-square">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
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
                src={productImage}
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
                className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/90 text-slate-950 shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-white"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-slate-950"
                  }`}
                />
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();

                  e.stopPropagation();

                  setOpenQuickView(true);
                }}
                className="absolute bottom-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/90 text-slate-950 shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-white"
              >
                <Eye className="h-5 w-5" />
              </Button>
            </div>

            <CardContent className="space-y-3 p-4">
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

                <span className="max-w-[112px] truncate rounded-full border border-border/70 bg-secondary px-3 py-1 text-xs font-medium">
                  {product.category}
                </span>
              </div>
            </CardContent>
          </Link>

          <div className="p-4 pt-0">
            <Button
              disabled={adding || product.stock <= 0}
              className="h-11 w-full rounded-xl text-sm font-semibold"
              onClick={() => {
                setAdding(true);

                addToCart({
                  ...product,
                  id: productId,
                  image: productImage,
                });

                setTimeout(() => {
                  setAdding(false);
                }, 500);
              }}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
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
