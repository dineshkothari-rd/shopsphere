import { useEffect, useState } from "react";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

import { subscribeToWishlist } from "../services/wishlist.service";

export const useWishlist = () => {
  const user = useAuthStore((state) => state.user);

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToWishlist(user.uid, (data) => {
      queueMicrotask(() => {
        setWishlist(data);
      });
    });

    return () => unsubscribe();
  }, [user]);

  return {
    wishlist,
  };
};
