import { useEffect, useState } from "react";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

import { subscribeToWishlist } from "../services/wishlist.service";

export const useWishlist = () => {
  const user = useAuthStore((state) => state.user);

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      queueMicrotask(() => {
        setWishlist([]);
        setLoading(false);
      });
      return;
    }

    queueMicrotask(() => {
      setLoading(true);
    });

    const unsubscribe = subscribeToWishlist(user.uid, (data) => {
      queueMicrotask(() => {
        setWishlist(data);
        setLoading(false);
      });
    });

    return () => unsubscribe();
  }, [user]);

  return {
    wishlist,
    loading,
  };
};
