export const validateProduct = (product) => {
  if (!product.title.trim()) {
    return "Title is required";
  }

  if (!product.price) {
    return "Price is required";
  }

  if (!product.category.trim()) {
    return "Category is required";
  }

  return null;
};
