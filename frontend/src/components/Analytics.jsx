// src/pages/Analytics.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=10").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">📈 Product Analytics</h1>

      <p className="max-w-3xl mx-auto text-center text-gray-300 mb-8 text-lg px-4">
        This page visualizes key product data such as price and stock levels
        using interactive charts. Understanding these trends helps you make
        informed inventory and pricing decisions to optimize sales and profits.
      </p>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Price vs Stock Chart</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={products}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="title" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
            <Line type="monotone" dataKey="stock" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;
