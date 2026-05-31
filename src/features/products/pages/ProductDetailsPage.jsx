import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Link, useNavigate, useParams } from "react-router-dom";

import Container from "@/components/shared/Container";

import { Button } from "@/components/ui/button";

import {
  getProducts,
  getRelatedProducts,
  getSingleProduct,
} from "@/features/products/services/product.service";

import { useCartStore } from "@/features/cart/store/useCartStore";
import {
  ArrowLeft,
  BadgeCheck,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

import { ReviewForm, ReviewsList } from "@/features/reviews";
import ProductCard from "../components/ProductCard";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const addToCart = useCartStore((state) => state.addToCart);
  const [activeImage, setActiveImage] = useState("");

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const discountPercentage =
    product?.comparePrice > product?.price
      ? Math.round(
          ((product.comparePrice - product.price) / product.comparePrice) * 100,
        )
      : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getSingleProduct(id);

        const allProducts = await getProducts();

        const related = await getRelatedProducts(allProducts, data);

        queueMicrotask(() => {
          setProduct(data);
          setActiveImage(data.images?.[0] || data.image);

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
    <section className="page-shell">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate("/products");
              }
            }}
            className="h-11 rounded-xl border-border/70 bg-card px-5"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>

            <span>/</span>

            <Link to="/products" className="hover:text-foreground">
              Products
            </Link>

            <span>/</span>

            <span className="line-clamp-1 max-w-[200px] text-foreground">
              {product.title}
            </span>
          </div>
        </div>
        <div className="grid items-start gap-6 lg:gap-12 lg:grid-cols-2">
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
            className="space-y-5"
          >
            <div className="app-surface group overflow-hidden rounded-2xl p-2 sm:p-4">
              <div className="relative overflow-hidden rounded-xl">
                {/* badges */}
                <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
                  {discountPercentage > 0 && (
                    <span className="rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
                      {discountPercentage}% OFF
                    </span>
                  )}

                  {product.isNew && (
                    <span className="rounded-full bg-blue-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
                      NEW
                    </span>
                  )}

                  {product.isTrending && (
                    <span className="rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
                      TRENDING
                    </span>
                  )}
                </div>

                <img
                  src={activeImage}
                  alt={product.title}
                  className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[500px] lg:h-[650px]"
                />
                <div className="grid grid-cols-4 gap-3">
                  {(product.images || [product.image]).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(image)}
                      className={`overflow-hidden rounded-2xl border transition ${
                        activeImage === image
                          ? "border-primary"
                          : "border-border/70"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`thumb-${index}`}
                        className="h-24 w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* highlights */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Truck,
                  title: "Free Delivery",
                },

                {
                  icon: ShieldCheck,
                  title: "Secure Payment",
                },

                {
                  icon: RotateCcw,
                  title: "Easy Returns",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="app-surface flex items-center gap-3 rounded-2xl p-4"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
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
            <div className="app-surface space-y-5 rounded-2xl p-4 sm:p-6 lg:p-8">
              {/* category + title */}
              <div className="space-y-5">
                <div className="eyebrow">
                  {product.category}
                </div>

                <h1 className="text-2xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
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
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
                    ₹{product.price}
                  </h2>

                  {product.comparePrice > product.price && (
                    <span className="text-lg text-muted-foreground line-through sm:text-2xl">
                      ₹{product.comparePrice}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {discountPercentage > 0 && (
                    <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-500">
                      Save {discountPercentage}%
                    </span>
                  )}

                  {product.stock > 0 ? (
                    <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                      In Stock ({product.stock})
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500">
                      Out Of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  disabled={product.stock <= 0}
                  className="h-14 flex-1 rounded-xl text-base font-semibold"
                  onClick={() => addToCart(product)}
                >
                  {product.stock <= 0 ? "Out Of Stock" : "Add To Cart"}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  disabled={product.stock <= 0}
                  onClick={() => {
                    addToCart(product);

                    navigate("/checkout");
                  }}
                  className="h-14 flex-1 rounded-xl border-border/70 bg-background/70 text-base font-semibold"
                >
                  Buy Now
                </Button>
              </div>
              <div className="space-y-4 rounded-2xl border border-border/70 bg-background/60 p-6">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-6 w-6 text-primary" />

                  <h2 className="text-xl font-bold">Available Offers</h2>
                </div>

                <div className="space-y-3">
                  {[
                    "10% instant discount on prepaid orders",
                    "Free delivery on orders above ₹999",
                    "Easy 7-day return policy",
                  ].map((offer) => (
                    <div
                      key={offer}
                    className="flex items-start gap-3 rounded-xl border border-border/70 p-4"
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary" />

                      <p className="text-sm text-muted-foreground">{offer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* product info */}
              <div className="rounded-2xl border border-border/70 bg-background/60 p-6">
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
            <div className="eyebrow">
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
