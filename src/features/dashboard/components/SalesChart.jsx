import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";

const data = [
  {
    month: "Jan",
    revenue: 4000,
  },

  {
    month: "Feb",
    revenue: 3000,
  },

  {
    month: "Mar",
    revenue: 5000,
  },

  {
    month: "Apr",
    revenue: 7000,
  },

  {
    month: "May",
    revenue: 6000,
  },
];

const SalesChart = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="glass premium-shadow rounded-[2rem] border border-white/10 p-4 sm:p-6"
    >
      <h2 className="mb-6 text-2xl font-black tracking-tight">
        Revenue Overview
      </h2>

      <div className="h-[300px] sm:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line type="monotone" dataKey="revenue" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesChart;
