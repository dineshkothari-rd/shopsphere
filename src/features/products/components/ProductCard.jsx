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
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
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
    <motion.div
      whileHover={{
        y: window.innerWidth >= 1024 ? -6 : -2,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Card className="glass premium-shadow overflow-hidden rounded-[1.75rem] border border-white/10 transition-all duration-300">
        <Link to={`/products/${product.id}`}>
          <div className="relative aspect-[4/4.5] overflow-hidden bg-muted sm:aspect-square">
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
              className="glass absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 backdrop-blur-xl transition hover:scale-105"
            >
              <Heart
                className={`h-5 w-5 ${
                  isWishlisted ? "fill-red-500 text-red-500" : " text-white"
                }`}
              />
            </Button>
          </div>

          <CardContent className="space-y-4 p-4 sm:p-5">
            <div>
              <h2 className="line-clamp-1 text-base font-bold sm:text-lg">
                {product.title}
              </h2>

              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-lg font-black sm:text-xl">
                ₹{product.price}
              </span>

              <span className="truncate rounded-full border border-white/10 bg-secondary/60 px-3 py-1 text-xs backdrop-blur-xl">
                {product.category}
              </span>
            </div>
          </CardContent>
        </Link>

        <div className="p-4 pt-0 sm:px-5 sm:pb-5">
          <Button
            className="h-11 w-full rounded-2xl text-sm font-semibold sm:h-12 sm:text-base"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
