import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Container from "@/components/shared/Container";

import { Button } from "@/components/ui/button";

import { getSingleProduct } from "@/services/firebase/productMethods";

import { useCartStore } from "@/store/useCartStore";
import ReviewForm from "@/components/product/ReviewForm";

import ReviewsList from "@/components/product/ReviewsList";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getSingleProduct(id);

        queueMicrotask(() => {
          setProduct(data);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);

        queueMicrotask(() => {
          setLoading(false);
        });
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <section className="py-10">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border bg-muted">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <span className="rounded-full bg-secondary px-4 py-1 text-sm">
                {product.category}
              </span>

              <h1 className="text-4xl font-bold">{product.title}</h1>

              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="text-5xl font-bold">₹{product.price}</div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </Button>

              <Button size="lg" variant="outline" className="flex-1">
                Buy Now
              </Button>
            </div>

            <div className="rounded-2xl border p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Product Information
              </h2>

              <div className="space-y-3 text-muted-foreground">
                <p>Category: {product.category}</p>

                <p>Stock Available: {product.stock}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <ReviewForm productId={product.id} />

          <ReviewsList productId={product.id} />
        </div>
      </Container>
    </section>
  );
};

export default ProductDetailsPage;
