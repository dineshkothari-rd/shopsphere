import { useEffect, useState } from "react";

import { subscribeToProducts } from "@/features/products/services/product.service";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      queueMicrotask(() => {
        setProducts(data);
        setLoading(false);
      });
    });

    return () => unsubscribe();
  }, []);

  return {
    products,
    loading,
  };
};
