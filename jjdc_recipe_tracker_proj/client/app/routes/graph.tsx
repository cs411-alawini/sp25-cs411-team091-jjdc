import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Monday', total: 1000, value: 40 },
  { name: 'Tuesday', total: 1000, value: 20 },
  { name: 'Wednesday', total: 1300, value: 50 },
  { name: 'Thursday', total: 1200, value: 40},
  { name: 'Friday', total: 1280, value: 20 },
  { name: 'Saturday', total: 1109, value: 50 },
  { name: 'Sunday', total: 1003, value: 50 }
];

const ExampleGraph: React.FC = () => {
  return (
    <div>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar type="monotone" dataKey="total" stroke="#8884d8" fill="#0000FF" name = "Total Calories" />
      </BarChart>
    </ResponsiveContainer>
    <Link to="/register">
      <button>Go to Another Page</button>
    </Link>
    </div>
  );
};
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: 10 }}>
        <p><strong>{label}</strong></p>
        <p>Total Calories: {data.total}</p>
        <p>Value A: {data.value}</p>
      </div>
    );
  }
  return null;
};

export default ExampleGraph;