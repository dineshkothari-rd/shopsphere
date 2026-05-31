import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { updateProduct } from "@/features/products/services/product.service";

const EditProductDialog = ({ open, onOpenChange, product, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    if (!product) return;

    queueMicrotask(() => {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        stock: product.stock || "",
        image: product.image || "",
      });
    });
  }, [product]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product) return;

    try {
      setLoading(true);

      await updateProduct(product.id, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });

      toast.success("Product updated");

      onSuccess();

      onOpenChange(false);
    } catch (error) {
      console.log(error);

      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border border-border/70 bg-card sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black tracking-tight">
            Edit Product
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Product title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="h-12 rounded-xl border-border/70 bg-background/70"
          />

          <Input
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="h-12 rounded-xl border-border/70 bg-background/70"
          />

          <Input
            type="number"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="h-12 rounded-xl border-border/70 bg-background/70"
          />

          <Input
            placeholder="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="h-12 rounded-xl border-border/70 bg-background/70"
          />

          <Input
            type="number"
            placeholder="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="h-12 rounded-xl border-border/70 bg-background/70"
          />

          {formData.image && (
            <img
              src={formData.image}
              alt="preview"
              className="h-40 w-40 rounded-3xl object-cover"
            />
          )}

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-2xl"
          >
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
