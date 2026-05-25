import {
  createProductDB,
  deleteProductDB,
  getProductsDB,
  getSingleProductDB,
  subscribeToProductsDB,
  updateProductDB,
} from "../repositories/product.repository";

export const getProducts = getProductsDB;

export const subscribeToProducts = subscribeToProductsDB;

export const getSingleProduct = getSingleProductDB;

export const createProduct = createProductDB;

export const updateProduct = updateProductDB;

export const deleteProduct = deleteProductDB;

export const getRelatedProducts = async (products, currentProduct) => {
  return products
    .filter(
      (item) =>
        item.category === currentProduct.category &&
        item.id !== currentProduct.id,
    )
    .slice(0, 4);
};
