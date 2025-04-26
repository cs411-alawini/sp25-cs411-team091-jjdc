import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

const ExampleGraph: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserMacros = async () => {
      try {
        const response = await axios.get('http://localhost:3007/api/balancebites/macros');
        const backendData = response.data;

        const chartData = backendData.map((item: any) => ({
          name: item.dayOfWeek,
          calories: item.sumCalories,
          fat: item.sumFat,
          carbs: item.sumCarbohydrates,
          protein: item.sumProtein,
        }));

        setData(chartData);
      } catch (error) {
        console.error('Error fetching macros data:', error);
      }
    };

    fetchUserMacros();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="calories" fill="#82ca9d" name="Calories" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: 10 }}>
        <p><strong>{label}</strong></p>
        <p>Calories: {data.calories}</p>
        <p>Fat: {data.fat}g</p>
        <p>Carbs: {data.carbs}g</p>
        <p>Protein: {data.protein}g</p>
      </div>
    );
  }
  return null;
};

export default ExampleGraph;