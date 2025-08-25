import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { FaShoppingCart, FaDollarSign, FaBoxOpen, FaExclamationTriangle } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const mockData = {
  totalOrders: 1250,
  totalSalesAmount: 54321.75,
  totalInventoryValue: 123456.78,
  lowStockProducts: 15,
};

// Mock data for charts - in a real app, this would come from a more detailed API endpoint
const salesChartData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 7500 },
];

const productStatusData = [
  { name: 'In Stock', value: 500 },
  { name: 'Low Stock', value: 15 },
  { name: 'Out of Stock', value: 5 },
];
const COLORS = ['#22c55e', '#facc15', '#ef4444'];

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics from backend
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/analytics', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        const data = await response.json();
        setAnalyticsData({
          ...mockData,
          ...data,
        });
      } catch (err) {
        setError(err.message);
        setAnalyticsData(mockData);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  // Helper function to format currency
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1 ml-64">
          <Navbar />
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-6 overflow-y-auto">
          {/* Header */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Business Analytics Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  View key performance indicators and sales trends
                </p>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md"
              >
                <div className="flex justify-between items-center">
                  <p className="text-red-700">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Analytics Content */}
          <div className="grid grid-cols-1 gap-6">
            {/* Key Performance Indicators (KPI) Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Total Orders Card */}
              <div className="flex items-center p-6 bg-white rounded-xl shadow-md transition-transform duration-200 hover:scale-105">
                <FaShoppingCart className="w-12 h-12 mr-6 text-blue-600" />
                <div className="flex-1">
                  <p className="text-gray-500 text-lg">Total Orders</p>
                  <p className="mt-1 text-3xl font-bold">{analyticsData.totalOrders}</p>
                </div>
              </div>

              {/* Total Sales Card */}
              <div className="flex items-center p-6 bg-white rounded-xl shadow-md transition-transform duration-200 hover:scale-105">
                <FaDollarSign className="w-12 h-12 mr-6 text-green-600" />
                <div className="flex-1">
                  <p className="text-gray-500 text-lg">Total Sales</p>
                  <p className="mt-1 text-3xl font-bold">{formatCurrency(analyticsData.totalSalesAmount)}</p>
                </div>
              </div>

              {/* Total Inventory Value Card */}
              <div className="flex items-center p-6 bg-white rounded-xl shadow-md transition-transform duration-200 hover:scale-105">
                <FaBoxOpen className="w-12 h-12 mr-6 text-purple-600" />
                <div className="flex-1">
                  <p className="text-gray-500 text-lg">Total Inventory Value</p>
                  <p className="mt-1 text-3xl font-bold">{formatCurrency(analyticsData.totalInventoryValue)}</p>
                </div>
              </div>

              {/* Low Stock Products Card */}
              <div className="flex items-center p-6 bg-white rounded-xl shadow-md transition-transform duration-200 hover:scale-105">
                <FaExclamationTriangle className="w-12 h-12 mr-6 text-red-600" />
                <div className="flex-1">
                  <p className="text-gray-500 text-lg">Low Stock Products</p>
                  <p className="mt-1 text-3xl font-bold">{analyticsData.lowStockProducts}</p>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-4">
              {/* Monthly Sales Trend Chart */}
              <div className="p-6 bg-white rounded-xl shadow-md lg:col-span-2">
                <h2 className="mb-4 text-2xl font-semibold text-center text-gray-900">Monthly Sales Trend</h2>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart
                    data={salesChartData}
                    margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Product Stock Status Pie Chart */}
              <div className="p-6 bg-white rounded-xl shadow-md">
                <h2 className="mb-4 text-2xl font-semibold text-center text-gray-900">Product Stock Status</h2>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={productStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {productStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;