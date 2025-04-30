import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ComposedChart, AreaChart, Area
} from 'recharts';
import './Analysis.css';
import axios from "axios";

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#5522DD'];

const Analysis = ({ url }) => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(url + "/api/order/list");
        if (response.data.success) {
          const orders = response.data.data;
          const foodCount = {};

          orders.forEach(order => {
            order.items.forEach(item => {
              foodCount[item.name] = (foodCount[item.name] || 0) + item.quantity;
            });
          });

          const formattedData = Object.keys(foodCount).map(food => ({
            name: food,
            orders: foodCount[food],
          }));

          setFoodData(formattedData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [url]);

  const scatterData = foodData.map((item, index) => ({
    x: index * 10,
    y: item.orders,
  }));

  const heatmapData = [
    [5, 10, 15],
    [10, 20, 30],
    [20, 30, 40],
  ];

  const downloadCSV = () => {
    const csvRows = [
      ["Food Name", "Orders"],
      ...foodData.map(item => [item.name, item.orders])
    ];

    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'food_orders_report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="analysis">
      <h2>Food Orders Analysis</h2>
      <button onClick={downloadCSV} className="download-btn">Download Report ✔</button>

      <h3>1. Line Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={foodData}>
          <Line type="monotone" dataKey="orders" stroke="#8884d8" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>

      <h3>2. Bar Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={foodData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="orders" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h3>3. Pie Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={foodData} dataKey="orders" nameKey="name" outerRadius={100} fill="#8884d8" label>
            {foodData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <h3>4. Scatter Plot</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis dataKey="x" name="Order Amount" />
          <YAxis dataKey="y" name="Count" />
          <Tooltip />
          <Scatter data={scatterData} fill="#ff7300" />
        </ScatterChart>
      </ResponsiveContainer>

      <h3>5. Candlestick Chart (Simulated)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={foodData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="orders" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="orders" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>

      <h3>6. Histogram</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={foodData}>
          <XAxis dataKey="orders" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="orders" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>

      <h3>7. Bubble Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis dataKey="orders" name="Orders" />
          <YAxis dataKey="orders" name="Orders" />
          <Tooltip />
          <Scatter data={foodData.map(d => ({ x: d.orders, y: d.orders }))} fill="#00C49F" />
        </ScatterChart>
      </ResponsiveContainer>

      <h3>8. Area Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={foodData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="orders" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>

      <h3>9. Heatmap</h3>
      <div className="heatmap">
        {heatmapData.map((row, i) => (
          <div className="heatmap-row" key={i}>
            {row.map((cell, j) => (
              <div
                key={j}
                className="heatmap-cell"
                style={{ background: `rgba(0, 0, 255, ${cell / 50})` }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analysis;
