import { useEffect, useState } from "react";

import SalesChart from "@/components/admin/SalesChart";

import { subscribeToDashboardStats } from "@/services/firebase/dashboardMethods";

const DashboardPage = () => {
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

  const cards = [
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue}`,
    },

    {
      title: "Orders",
      value: stats.totalOrders,
    },

    {
      title: "Products",
      value: stats.totalProducts,
    },

    {
      title: "Users",
      value: stats.totalUsers,
    },
  ];

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <p className="text-muted-foreground">Ecommerce analytics overview</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border bg-card p-6 shadow-sm"
          >
            <p className="text-muted-foreground">{item.title}</p>

            <h2 className="mt-2 text-4xl font-bold">{item.value}</h2>
          </div>
        ))}
      </div>

      <SalesChart />
    </div>
  );
};

export default DashboardPage;
