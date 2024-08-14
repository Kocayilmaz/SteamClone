import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";

const DynamicLineChart = () => {
  const downloadProgress = useSelector(
    (state) => state.download.downloadProgress
  );

  const data = [
    { name: "0%", value: 0 },
    { name: "20%", value: (downloadProgress / 100) * 20 },
    { name: "40%", value: (downloadProgress / 100) * 40 },
    { name: "60%", value: (downloadProgress / 100) * 60 },
    { name: "80%", value: (downloadProgress / 100) * 80 },
    { name: "100%", value: downloadProgress },
  ];

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default DynamicLineChart;
