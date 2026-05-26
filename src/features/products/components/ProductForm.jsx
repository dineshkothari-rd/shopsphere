import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, Package, Tag } from "lucide-react";

const ProductForm = ({
  initialData = null,
  onSubmit,
  loading = false,
  submitText = "Submit",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    comparePrice: "",
    isNew: false,
    isTrending: false,
  });

  useEffect(() => {
    if (!initialData) return;

    queueMicrotask(() => {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        category: initialData.category || "",
        stock: initialData.stock || "",
        image: initialData.image || "",
      });
    });
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const base64 = await convertToBase64(file);

    queueMicrotask(() => {
      setFormData((prev) => ({
        ...prev,
        image: base64,
      }));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit({
      ...formData,

      price: Number(formData.price),

      stock: Number(formData.stock),

      comparePrice: Number(formData.comparePrice || 0),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* basic info */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Package className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold">Product Information</h2>

            <p className="text-sm text-muted-foreground">
              Add product details and inventory information.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Product Title</label>

          <Input
            placeholder="Enter product title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="h-12 rounded-2xl border-white/10 bg-background/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>

          <Input
            placeholder="Write product description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="h-12 rounded-2xl border-white/10 bg-background/50"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Price</label>

            <Input
              type="number"
              placeholder="₹999"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="h-12 rounded-2xl border-white/10 bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Stock Quantity</label>

            <Input
              type="number"
              placeholder="Available stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="h-12 rounded-2xl border-white/10 bg-background/50"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Compare Price</label>

              <Input
                type="number"
                placeholder="Original price"
                name="comparePrice"
                value={formData.comparePrice}
                onChange={handleChange}
                className="h-12 rounded-2xl border-white/10 bg-background/50"
              />
            </div>

            <div className="flex items-end gap-3 pb-1">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isNew: e.target.checked,
                    }))
                  }
                />

                <span className="text-sm font-medium">New Product</span>
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={formData.isTrending}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isTrending: e.target.checked,
                    }))
                  }
                />

                <span className="text-sm font-medium">Trending</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>

          <div className="relative">
            <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Fashion, Electronics..."
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="h-12 rounded-2xl border-white/10 bg-background/50 pl-11"
            />
          </div>
        </div>
      </div>

      {/* image upload */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ImagePlus className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold">Product Image</h2>

            <p className="text-sm text-muted-foreground">
              Upload a premium product thumbnail.
            </p>
          </div>
        </div>

        <label className="glass flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[2rem] border border-dashed border-white/10 p-8 text-center transition hover:border-primary/30 hover:bg-primary/5">
          <ImagePlus className="h-10 w-10 text-muted-foreground" />

          <div>
            <p className="font-medium">Click to upload image</p>

            <p className="text-sm text-muted-foreground">
              PNG, JPG, WEBP supported
            </p>
          </div>

          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {formData.image && (
          <div className="overflow-hidden rounded-[2rem] border border-white/10">
            <img
              src={formData.image}
              alt="preview"
              className="h-64 w-full object-cover"
            />
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-2xl text-base font-semibold"
      >
        {loading ? "Please wait..." : submitText}
      </Button>
    </form>
  );
};

export default ProductForm;
