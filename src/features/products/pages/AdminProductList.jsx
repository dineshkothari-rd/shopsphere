import { useEffect, useState } from "react";

import {
  deleteProduct,
  subscribeToProducts,
} from "@/features/products/services/product.service";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import ProductDialog from "../components/ProductDialog";

const AdminProductList = () => {
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

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);

      toast.success("Product deleted");
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading products...</p>;
  }

  return (
    <div className="space-y-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="glass premium-shadow flex flex-col gap-5 rounded-[2rem] border border-white/10 p-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex items-center gap-4">
            <img
              src={product.image || product.images?.[0]}
              alt={product.title}
              className="h-20 w-20 rounded-2xl object-cover"
            />

            <div>
              <h2 className="text-lg font-bold">{product.title}</h2>

              <p className="line-clamp-2 text-sm text-muted-foreground">
                {product.description}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {product.category}
                </span>

                <span className="text-lg font-black">₹{product.price}</span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    product.stock > 0
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {product.stock > 0
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <ProductDialog mode="edit" product={product} />

            <Button
              onClick={() => handleDelete(product.id)}
              className="h-11 rounded-2xl bg-red-500 text-white hover:bg-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProductList;
