import { motion } from "framer-motion";

import { ArrowRight, BadgeCheck, PackageCheck, RotateCcw, Truck } from "lucide-react";

import { Link } from "react-router-dom";

import Container from "@/components/shared/Container";

import { Button } from "@/components/ui/button";
import { HOME_CATEGORIES } from "../constants/homepage";

const HomePage = () => {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[72%] bg-gradient-to-b from-secondary/80 to-transparent" />

        <Container className="relative grid min-h-[calc(100svh-4rem)] items-center gap-8 py-6 sm:py-10 lg:grid-cols-[1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            <div className="eyebrow">New season essentials</div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Shop smarter with products that fit real life.
              </h1>

              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Browse curated electronics, fashion, accessories, and everyday
                upgrades with a fast checkout-ready experience.
              </p>
            </div>

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <Button
                asChild
                className="h-12 rounded-xl px-6 text-base font-semibold"
              >
                <Link to="/products">
                  Shop Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl bg-card/80 px-6 text-base font-semibold"
              >
                <Link to="/wishlist">View Wishlist</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                ["10K+", "Customers"],
                ["500+", "Products"],
                ["4.9", "Rating"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border/70 bg-card/80 p-4"
                >
                  <h2 className="text-2xl font-black">{value}</h2>
                  <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-card p-2 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
                alt="Modern shopping collection"
                className="aspect-[4/5] w-full rounded-2xl object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
              />
            </div>

            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/90 p-4 text-slate-950 shadow-xl backdrop-blur-xl dark:bg-slate-950/90 dark:text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Today&apos;s pick
              </p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-black">Everyday Carry Set</h3>
                  <p className="text-sm text-muted-foreground">
                    Curated accessories
                  </p>
                </div>
                <p className="text-xl font-black">₹4,999</p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="py-10 sm:py-16">
        <Container className="space-y-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="eyebrow">Browse</div>
              <h2 className="mt-3 page-title">Shop By Category</h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Mobile-first browsing with quick product discovery across curated
              collections.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOME_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-20">
                  <h3 className="text-2xl font-black text-white">
                    {category.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-16">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-border/70 bg-foreground text-background shadow-xl">
            <div className="grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop"
                alt="Seasonal apparel collection"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />

              <div className="space-y-5">
                <div className="inline-flex w-max rounded-full bg-background/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide">
                  Limited edit
                </div>

                <h2 className="text-3xl font-black leading-tight sm:text-5xl">
                  Fresh collections for fast, everyday shopping.
                </h2>

                <p className="max-w-xl leading-7 text-background/70">
                  Keep the payment service for last while the product discovery,
                  cart, wishlist, and order flows already feel ready to use.
                </p>

                <Button asChild className="h-12 rounded-xl px-6">
                  <Link to="/products">Explore Deals</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-16">
        <Container className="space-y-8">
          <div>
            <div className="eyebrow">Why ShopSphere</div>
            <h2 className="mt-3 page-title">Built for repeat shopping</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              [Truck, "Fast Delivery", "Clear order progress from cart to doorstep."],
              [PackageCheck, "Live Inventory", "Stock updates when orders are placed or cancelled."],
              [RotateCcw, "Easy Returns", "Simple post-order support for customer confidence."],
              [BadgeCheck, "Curated Quality", "Focused product pages and quick browsing."],
            ].map(([Icon, title, desc]) => (
              <div key={title} className="soft-card soft-card-hover p-5">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
