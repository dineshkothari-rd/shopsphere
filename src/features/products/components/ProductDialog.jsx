import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  createProduct,
  updateProduct,
} from "@/features/products/services/product.service";

import { toast } from "sonner";

import { Pencil, Plus } from "lucide-react";
import ProductForm from "./ProductForm";

const ProductDialog = ({ mode = "create", product = null }) => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const isEdit = mode === "edit";

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      if (isEdit) {
        await updateProduct(product.id, data);

        toast.success("Product updated successfully");
      } else {
        await createProduct(data);

        toast.success("Product added successfully");
      }

      setOpen(false);
    } catch (error) {
      console.log(error);

      toast.error(
        isEdit ? "Failed to update product" : "Failed to add product",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button
            variant="outline"
            className="h-11 rounded-2xl border-white/10"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        ) : (
          <Button className="h-12 rounded-2xl">
            <Plus className="mr-2 h-5 w-5" />
            Add Product
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="glass max-h-[90vh] overflow-y-auto rounded-[2rem] border border-white/10 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black tracking-tight">
            {isEdit ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>

        <ProductForm
          initialData={product}
          loading={loading}
          submitText={isEdit ? "Update Product" : "Add Product"}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
