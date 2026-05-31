import { useMemo, useState } from "react";

import ProductCard from "@/features/products/components/ProductCard";
import ProductCardSkeleton from "@/features/products/components/ProductCardSkeleton";

import Container from "@/components/shared/Container";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const ProductsPage = () => {
  const { products, loading } = useProducts();

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("");

  const [category, setCategory] = useState("all");

  const [priceRange, setPriceRange] = useState("all");

  const [tempCategory, setTempCategory] = useState("all");

  const [tempPriceRange, setTempPriceRange] = useState("all");

  const [tempSort, setTempSort] = useState("");

  const [openFilters, setOpenFilters] = useState(false);

  const categories = useMemo(() => {
    const unique = [
      ...new Set(products.map((item) => item.category).filter(Boolean)),
    ];

    return unique;
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (priceRange === "under1000") {
      filtered = filtered.filter((item) => item.price < 1000);
    }

    if (priceRange === "1000to5000") {
      filtered = filtered.filter(
        (item) => item.price >= 1000 && item.price <= 5000,
      );
    }

    if (priceRange === "5000plus") {
      filtered = filtered.filter((item) => item.price > 5000);
    }

    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, search, sort, category, priceRange]);

  const resetFilters = () => {
    setSearch("");

    setCategory("all");
    setPriceRange("all");
    setSort("");

    setTempCategory("all");
    setTempPriceRange("all");
    setTempSort("");
  };

  return (
    <section className="page-shell">
      <Container className="relative space-y-8">
        <div className="space-y-4">
          <div className="eyebrow">
            Explore Products
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="page-title">
                Discover Products
              </h1>

              <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
                Curated premium products for modern shopping experience.
              </p>
            </div>

            <div className="app-surface w-full rounded-2xl px-5 py-4 sm:w-max">
              <p className="text-sm text-muted-foreground">Total Products</p>

              <h2 className="text-3xl font-black">{filteredProducts.length}</h2>
            </div>
          </div>
        </div>
        <div className="app-surface sticky top-20 z-20 rounded-2xl p-3 sm:p-4">
          {/* mobile */}
          <div className="space-y-4 lg:hidden">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 rounded-xl border-border/70 bg-background/70 pl-12"
              />
            </div>

            <div className="flex gap-3">
              <Sheet open={openFilters} onOpenChange={setOpenFilters}>
                <SheetTrigger asChild>
                  <Button className="h-12 flex-1 rounded-2xl">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>

                <SheetContent
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  className="w-full border-l border-border/70 bg-card px-5 py-8 sm:max-w-md"
                >
                  <div className="flex h-full flex-col overflow-y-auto">
                    <div className="mb-8">
                      <h2 className="text-3xl font-black tracking-tight">
                        Filters
                      </h2>

                      <p className="mt-2 text-sm text-muted-foreground">
                        Refine your shopping experience
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Category</label>

                        <Select
                          value={tempCategory}
                          onValueChange={setTempCategory}
                        >
                          <SelectTrigger className="h-14 min-h-14 w-full rounded-xl border border-border/70 bg-background/70 px-4 text-left text-base shadow-sm">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>

                          <SelectContent
                            position="popper"
                            className="z-9999 rounded-xl border border-border/70 bg-card"
                          >
                            <SelectItem
                              value="all"
                              className="rounded-xl py-3 text-base"
                            >
                              All Categories
                            </SelectItem>

                            {categories.map((cat) => (
                              <SelectItem
                                key={cat}
                                value={cat}
                                className="rounded-xl py-3 text-base"
                              >
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                          Price Range
                        </label>

                        <Select
                          value={tempPriceRange}
                          onValueChange={setTempPriceRange}
                        >
                          <SelectTrigger className="h-14 min-h-14 w-full rounded-xl border border-border/70 bg-background/70 px-4 text-left text-base shadow-sm">
                            <SelectValue placeholder="Price Range" />
                          </SelectTrigger>

                          <SelectContent
                            position="popper"
                            className="z-9999 rounded-xl border border-border/70 bg-card"
                          >
                            <SelectItem
                              value="all"
                              className="rounded-xl py-3 text-base"
                            >
                              All Prices
                            </SelectItem>

                            <SelectItem
                              value="under1000"
                              className="rounded-xl py-3 text-base"
                            >
                              Under ₹1000
                            </SelectItem>

                            <SelectItem
                              value="1000to5000"
                              className="rounded-xl py-3 text-base"
                            >
                              ₹1000 - ₹5000
                            </SelectItem>

                            <SelectItem
                              value="5000plus"
                              className="rounded-xl py-3 text-base"
                            >
                              Above ₹5000
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                          Sort Products
                        </label>

                        <Select value={tempSort} onValueChange={setTempSort}>
                          <SelectTrigger className="h-14 min-h-14 w-full rounded-xl border border-border/70 bg-background/70 px-4 text-left text-base shadow-sm">
                            <SelectValue placeholder="Sort By" />
                          </SelectTrigger>

                          <SelectContent
                            position="popper"
                            className="z-9999 rounded-xl border border-border/70 bg-card"
                          >
                            <SelectItem
                              value="low"
                              className="rounded-xl py-3 text-base"
                            >
                              Price Low to High
                            </SelectItem>

                            <SelectItem
                              value="high"
                              className="rounded-xl py-3 text-base"
                            >
                              Price High to Low
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          className="h-12 flex-1 rounded-xl"
                          onClick={() => {
                            setCategory(tempCategory);

                            setPriceRange(tempPriceRange);

                            setSort(tempSort);

                            setOpenFilters(false);
                          }}
                        >
                          Apply Filters
                        </Button>

                        <Button
                          variant="outline"
                          className="h-12 rounded-xl border-border/70 px-5"
                          onClick={resetFilters}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Button
                variant="outline"
                className="h-12 rounded-xl border-border/70 px-5"
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                  setSort("");
                  setPriceRange("all");
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* desktop */}
          <div className="hidden items-center gap-4 lg:flex">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search premium products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 rounded-xl border-border/70 bg-background/70 pl-12"
              />
            </div>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-12 min-h-12 w-[180px] rounded-xl border-border/70 bg-background/70">
                <SelectValue placeholder="Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all" className="rounded-xl py-3 text-base">
                  All Categories
                </SelectItem>

                {categories.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="rounded-xl py-3 text-base"
                  >
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12 min-h-12 w-[180px] rounded-xl border-border/70 bg-background/70">
                <SelectValue placeholder="Price" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all" className="rounded-xl py-3 text-base">
                  All Prices
                </SelectItem>

                <SelectItem
                  value="under1000"
                  className="rounded-xl py-3 text-base"
                >
                  Under ₹1000
                </SelectItem>

                <SelectItem
                  value="1000to5000"
                  className="rounded-xl py-3 text-base"
                >
                  ₹1000 - ₹5000
                </SelectItem>

                <SelectItem
                  value="5000plus"
                  className="rounded-xl py-3 text-base"
                >
                  Above ₹5000
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-12 min-h-12 w-[180px] rounded-xl border-border/70 bg-background/70">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="low" className="rounded-xl py-3 text-base">
                  Low to High
                </SelectItem>

                <SelectItem value="high" className="rounded-xl py-3 text-base">
                  High to Low
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="h-12 rounded-xl border-border/70 px-5"
              onClick={resetFilters}
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {loading
            ? Array.from({
                length: 8,
              }).map((_, index) => <ProductCardSkeleton key={index} />)
            : filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.4,
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
        </motion.div>
        {!loading && filteredProducts.length === 0 && (
          <div className="app-surface rounded-2xl p-8 text-center sm:p-16">
            <h2 className="text-2xl font-black sm:text-3xl">
              No Products Found
            </h2>

            <p className="mt-3 text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductsPage;
