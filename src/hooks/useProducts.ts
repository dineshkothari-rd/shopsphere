import { useEffect, useState } from "react";

import { subscribeToProducts } from "@/features/products/services/product.service";

export const useProducts = () => {
  const [products, setProducts] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data: any[]) => {
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
