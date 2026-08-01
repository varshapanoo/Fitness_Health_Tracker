import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function LineChartComponent() {
  const data = [
    { day: "Mon", calories: 300 },
    { day: "Tue", calories: 450 },
    { day: "Wed", calories: 380 },
    { day: "Thu", calories: 520 },
    { day: "Fri", calories: 600 },
    { day: "Sat", calories: 420 },
    { day: "Sun", calories: 500 },
  ];

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="calories"
            stroke="#0d6efd"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartComponent;