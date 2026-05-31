import { create } from "zustand";

const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

export const useCartStore = create((set, get) => ({
  cartItems: initialCart,

  syncCart: (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
  },

  addToCart: (product) => {
    const existingItem = get().cartItems.find((item) => item.id === product.id);
    const stock = Number(product.stock ?? Infinity);

    const updatedCart = existingItem
      ? get().cartItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, stock),
              }
            : item,
        )
      : [
          ...get().cartItems,
          {
            ...product,
            image: product.image || product.images?.[0] || "",
            quantity: 1,
          },
        ];

    set({ cartItems: updatedCart });

    get().syncCart(updatedCart);
  },

  removeFromCart: (id) => {
    const updatedCart = get().cartItems.filter((item) => item.id !== id);

    set({ cartItems: updatedCart });

    get().syncCart(updatedCart);
  },

  increaseQuantity: (id) => {
    const updatedCart = get().cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.min(item.quantity + 1, Number(item.stock ?? Infinity)),
          }
        : item,
    );

    set({ cartItems: updatedCart });

    get().syncCart(updatedCart);
  },

  decreaseQuantity: (id) => {
    const updatedCart = get()
      .cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      )
      .filter((item) => item.quantity > 0);

    set({ cartItems: updatedCart });

    get().syncCart(updatedCart);
  },

  clearCart: () => {
    set({ cartItems: [] });

    localStorage.removeItem("cart");
  },
}));
