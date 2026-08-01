import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function DashboardChart({ workouts, meals }) {
  const data = [
    {
      name: "Fitness Tracker",
      Workouts: workouts,
      Meals: meals,
    },
  ];

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar dataKey="Workouts" fill="#0d6efd" />

          <Bar dataKey="Meals" fill="#198754" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardChart;