import ProductCard from "@/features/products/components/ProductCard";

import Container from "@/components/shared/Container";

import { useWishlist } from "../hooks/useWishlist";

const WishlistPage = () => {
  const { wishlist } = useWishlist();

  return (
    <section className="py-10">
      <Container className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Wishlist</h1>

          <p className="text-muted-foreground">Your saved products</p>
        </div>

        {!wishlist.length ? (
          <div className="rounded-3xl border p-12 text-center">
            <h2 className="text-2xl font-semibold">Wishlist is empty</h2>

            <p className="mt-2 text-muted-foreground">
              Save products to see them here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default WishlistPage;
