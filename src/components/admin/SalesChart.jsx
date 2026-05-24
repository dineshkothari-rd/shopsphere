import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
    <div className="rounded-3xl border bg-card p-6">
      <h2 className="mb-6 text-2xl font-bold">Revenue Overview</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line type="monotone" dataKey="revenue" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
