// File: reactapp/src/pages/Dashboard.js

import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Eye,
  Calendar,
  Filter,
  Download,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [stats] = useState({
    totalRevenue: 45420,
    totalOrders: 1294,
    totalCustomers: 8945,
    totalProducts: 342,
    revenueGrowth: 12.5,
    ordersGrowth: 8.2,
    customersGrowth: 15.3,
    productsGrowth: 5.1,
  });

  const [recentOrders] = useState([
    { id: 'ORD-001', customer: 'John Smith', amount: 245.5, status: 'completed', date: '2025-01-15' },
    { id: 'ORD-002', customer: 'Sarah Johnson', amount: 189.99, status: 'pending', date: '2025-01-15' },
    { id: 'ORD-003', customer: 'Mike Brown', amount: 67.25, status: 'shipped', date: '2025-01-14' },
    { id: 'ORD-004', customer: 'Emily Davis', amount: 445.8, status: 'completed', date: '2025-01-14' },
    { id: 'ORD-005', customer: 'David Wilson', amount: 123.45, status: 'processing', date: '2025-01-13' },
  ]);

  const [topProducts] = useState([
    { name: 'Wireless Headphones', sales: 245, revenue: 12250 },
    { name: 'Smart Watch', sales: 189, revenue: 37800 },
    { name: 'Laptop Stand', sales: 156, revenue: 7800 },
    { name: 'USB-C Cable', sales: 134, revenue: 2680 },
    { name: 'Phone Case', sales: 98, revenue: 2940 },
  ]);

  const StatCard = ({ title, value, icon: Icon, growth, prefix = '', suffix = '' }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div className={`flex items-center text-sm font-medium ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className={`h-4 w-4 mr-1 ${growth < 0 ? 'rotate-180' : ''}`} />
          {Math.abs(growth)}%
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">
        {prefix}
        {value.toLocaleString()}
        {suffix}
      </p>
    </div>
  );

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      shipped: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

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
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last 30 days
                </button>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Revenue" value={stats.totalRevenue} icon={DollarSign} growth={stats.revenueGrowth} prefix="$" />
            <StatCard title="Total Orders" value={stats.totalOrders} icon={ShoppingCart} growth={stats.ordersGrowth} />
            <StatCard title="Total Customers" value={stats.totalCustomers} icon={Users} growth={stats.customersGrowth} />
            <StatCard title="Total Products" value={stats.totalProducts} icon={Package} growth={stats.productsGrowth} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
              </div>
              <div className="p-6 space-y-4">
                {topProducts.map((product) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(product.sales / 250) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Filter className="h-4 w-4" />
              </button>
            </div>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                <p className="text-gray-600">Chart visualization would be implemented here</p>
                <p className="text-sm text-gray-500">using a charting library like Recharts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
