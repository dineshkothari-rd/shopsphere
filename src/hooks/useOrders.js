import { useEffect, useState } from "react";

import { subscribeToOrders } from "@/features/orders/services/order.service";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToOrders((data) => {
      queueMicrotask(() => {
        setOrders(data);
      });
    });

    return () => unsubscribe();
  }, []);

  return {
    orders,
  };
};
