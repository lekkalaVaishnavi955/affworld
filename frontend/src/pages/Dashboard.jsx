// src/pages/Dashboard.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome, {user?.firstName || user?.username || "User"} 👋
      </h1>

      <p className="text-gray-300 text-center max-w-xl mb-10 px-4 text-lg">
        This dashboard gives you an overview of your product analytics and management tools. Use the cards below to navigate to the analytics charts or the product CRUD operations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Link
          to="/analytics"
          className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-xl shadow-lg hover:scale-105 transform transition cursor-pointer"
        >
          <h2 className="text-3xl font-semibold mb-3">📊 View Analytics</h2>
          <p className="text-gray-200 text-lg">
            Explore product trends, stock, and price analysis with interactive charts.
          </p>
        </Link>

        <Link
          to="/products"
          className="bg-gradient-to-r from-green-600 to-emerald-700 p-8 rounded-xl shadow-lg hover:scale-105 transform transition cursor-pointer"
        >
          <h2 className="text-3xl font-semibold mb-3">🛍️ Manage Products</h2>
          <p className="text-gray-200 text-lg">
            Add, edit, or remove products in your inventory efficiently.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
