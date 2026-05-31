import { useEffect, useState } from "react";

import { subscribeToDashboardStats } from "@/features/dashboard/services/dashboard.service";

export const useDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const unsubscribe = subscribeToDashboardStats((data) => {
      queueMicrotask(() => {
        setStats(data);
      });
    });

    return () => unsubscribe();
  }, []);

  return {
    stats,
  };
};
