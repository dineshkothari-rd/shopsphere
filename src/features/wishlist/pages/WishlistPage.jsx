import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";

import ProductCard from "@/features/products/components/ProductCard";

import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";

import { useWishlist } from "../hooks/useWishlist";

const WishlistPage = () => {
  const { wishlist, loading } = useWishlist();

  const wishlistProducts = wishlist.map((item) => ({
    ...item,
    id: item.productId,
    wishlistId: item.id,
    images: item.images || (item.image ? [item.image] : []),
    description: item.description || "Saved product",
    category: item.category || "Wishlist",
    stock: item.stock,
    comparePrice: Number(item.comparePrice || 0),
  }));

  return (
    <section className="page-shell">
      <Container className="space-y-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <div className="inline-flex w-max rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Saved Items
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                Wishlist
              </h1>

              <p className="mt-2 text-muted-foreground">
                Keep your favorite products ready for later.
              </p>
            </div>
          </div>

          <div className="app-surface w-full rounded-2xl px-5 py-4 sm:w-max">
            <p className="text-sm text-muted-foreground">Saved Products</p>

            <h2 className="text-3xl font-black">{wishlistProducts.length}</h2>
          </div>
        </div>

        {loading ? (
          <div className="app-surface rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-black">Loading wishlist...</h2>
          </div>
        ) : !wishlistProducts.length ? (
          <div className="app-surface rounded-2xl p-10 text-center sm:p-16">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <Heart className="h-10 w-10" />
            </div>

            <h2 className="text-2xl font-black sm:text-3xl">
              Wishlist is empty
            </h2>

            <p className="mt-2 text-muted-foreground">
              Save products you like and come back when you are ready.
            </p>

            <Button asChild className="mt-6 h-12 rounded-2xl">
              <Link to="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Explore Products
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default WishlistPage;
