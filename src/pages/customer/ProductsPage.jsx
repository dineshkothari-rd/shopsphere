import { useEffect, useMemo, useState } from "react";

import ProductCard from "@/components/product/ProductCard";

import Container from "@/components/shared/Container";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getProducts } from "@/services/firebase/productMethods";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("");

  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((item) => item.category))];

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

    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, search, sort, category]);

  return (
    <section className="py-10">
      <Container className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-52">
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>

              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full md:w-52">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="low">Price Low to High</SelectItem>

              <SelectItem value="high">Price High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProductsPage;
