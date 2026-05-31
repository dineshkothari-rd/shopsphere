import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { createProduct } from "@/features/products/services/product.service";

const AddProductForm = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

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
    const file = e.target.files[0];

    if (!file) return;

    const base64 = await convertToBase64(file);

    setFormData((prev) => ({
      ...prev,
      image: base64,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createProduct({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });

      toast.success("Product added successfully");

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 glass premium-shadow mx-auto max-w-3xl rounded-2xl border border-white/10 p-5 sm:p-8"
    >
      <Input
        placeholder="Product title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />

      <Input
        placeholder="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <Input
        type="number"
        placeholder="Price"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />

      <Input
        placeholder="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
      />

      <Input
        type="number"
        placeholder="Stock"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
      />

      <Input type="file" accept="image/*" onChange={handleImageUpload} />

      {formData.image && (
        <img
          src={formData.image}
          alt="preview"
          className="h-32 w-32 rounded-lg object-cover"
        />
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Adding..." : "Add Product"}
      </Button>
    </form>
  );
};

export default AddProductForm;
