import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

import Container from "@/components/shared/Container";

import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <section className="relative overflow-hidden pb-16 pt-6 sm:pb-20 sm:pt-10">
      {/* blur effects */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
          {/* left */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-medium text-primary backdrop-blur-xl sm:px-4 sm:text-sm">
              ✨ Modern Ecommerce Experience
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                Discover
                <span className="gradient-text block">Premium</span>
                Products
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
                Experience the future of ecommerce with realtime shopping,
                premium UI, and seamless interactions.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                className="h-12 rounded-2xl px-6 text-sm font-semibold sm:h-14 sm:px-8 sm:text-base"
              >
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="glass h-14 rounded-2xl px-8 text-base"
              >
                Explore Collection
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 sm:flex sm:items-center sm:gap-10">
              <div>
                <h2 className="text-2xl font-black sm:text-3xl">10K+</h2>

                <p className="text-muted-foreground">Customers</p>
              </div>

              <div>
                <h2 className="text-2xl font-black sm:text-3xl">500+</h2>

                <p className="text-muted-foreground">Products</p>
              </div>

              <div>
                <h2 className="text-2xl font-black sm:text-3xl">4.9★</h2>

                <p className="text-muted-foreground">Rating</p>
              </div>
            </div>
          </motion.div>

          {/* right */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative"
          >
            <div className="glass premium-shadow relative overflow-hidden rounded-[2rem] border border-white/10 p-3 sm:p-6">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"
                alt="hero"
                className="h-[320px] w-full rounded-[1.5rem] object-cover sm:h-[450px] lg:h-[500px]"
              />
            </div>

            {/* floating card */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="glass premium-shadow absolute -bottom-6 left-4 rounded-3xl border border-white/10 p-4 sm:-bottom-10 sm:-left-10 sm:p-5"
            >
              <p className="text-sm text-muted-foreground">Trending Product</p>

              <h3 className="mt-1 text-lg font-bold">Apple Watch Ultra</h3>

              <p className="mt-2 text-xl font-black sm:text-2xl">₹89,999</p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HomePage;
