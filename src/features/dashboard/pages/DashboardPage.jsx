import SalesChart from "@/features/dashboard/components/SalesChart";

import { useDashboard } from "@/hooks/useDashboard";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const { stats } = useDashboard();

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
    <div className="space-y-6 p-4 sm:p-6 lg:space-y-8 lg:p-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          Dashboard
        </h1>

        <p className="text-muted-foreground">Ecommerce analytics overview</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{
              y: -4,
            }}
            className="glass premium-shadow rounded-[2rem] border border-white/10 p-5 sm:p-6"
          >
            <p className="text-sm text-muted-foreground">{item.title}</p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              {item.value}
            </h2>
          </motion.div>
        ))}
      </div>

      <SalesChart />
    </div>
  );
};

export default DashboardPage;
