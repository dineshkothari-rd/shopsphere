import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { useParams } from "react-router-dom";

import Container from "@/components/shared/Container";

import { Button } from "@/components/ui/button";

import {
  getProducts,
  getRelatedProducts,
  getSingleProduct,
} from "@/features/products/services/product.service";

import { useCartStore } from "@/features/cart/store/useCartStore";

import { ReviewForm, ReviewsList } from "@/features/reviews";
import ProductCard from "../components/ProductCard";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getSingleProduct(id);

        const allProducts = await getProducts();

        const related = await getRelatedProducts(allProducts, data);

        queueMicrotask(() => {
          setProduct(data);

          setRelatedProducts(related);

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
    <section className="relative overflow-hidden py-10">
      {/* background blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* image section */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="glass premium-shadow overflow-hidden rounded-[2rem] border border-white/10 p-5"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-[600px] w-full rounded-[1.5rem] object-cover transition duration-700 hover:scale-105"
            />
          </motion.div>

          {/* details section */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="space-y-8 lg:sticky lg:top-28"
          >
            <div className="glass premium-shadow space-y-6 rounded-[2rem] border border-white/10 p-8">
              {/* category + title */}
              <div className="space-y-5">
                <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  {product.category}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                  {product.title}
                </h1>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {/* rating */}
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-400">★★★★★</div>

                <p className="text-sm text-muted-foreground">
                  4.9 • 120 reviews
                </p>
              </div>

              {/* price */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black">
                ₹{product.price}
              </h2>

              {/* buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="h-14 flex-1 rounded-2xl text-base font-semibold"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 flex-1 rounded-2xl border-white/10 bg-background/50 text-base font-semibold backdrop-blur-xl"
                >
                  Buy Now
                </Button>
              </div>

              {/* product info */}
              <div className="rounded-3xl border border-white/10 bg-background/40 p-6 backdrop-blur-xl">
                <h2 className="mb-4 text-xl font-semibold">
                  Product Information
                </h2>

                <div className="space-y-3 text-muted-foreground">
                  <p>Category: {product.category}</p>

                  <p>Stock Available: {product.stock}</p>
                </div>
              </div>
            </div>

            {/* reviews */}
            <div className="space-y-8">
              <ReviewForm productId={product.id} />

              <ReviewsList productId={product.id} />
            </div>
          </motion.div>
        </div>
      </Container>
      {relatedProducts.length > 0 && (
        <Container className="relative mt-24">
          <div className="mb-10 space-y-3">
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Recommended
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              You May Also Like
            </h2>

            <p className="text-muted-foreground">
              Discover similar premium products curated for you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
              >
                <ProductCard product={item} />
              </motion.div>
            ))}
          </div>
        </Container>
      )}
    </section>
  );
};

export default ProductDetailsPage;
