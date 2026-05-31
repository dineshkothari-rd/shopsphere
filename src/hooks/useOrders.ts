import { useEffect, useState } from "react";

import { subscribeToOrders } from "@/features/orders/services/order.service";

export const useOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToOrders((data: any[]) => {
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
