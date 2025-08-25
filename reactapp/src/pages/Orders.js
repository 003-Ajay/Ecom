import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    shippingAddress: '',
    billingAddress: '',
    status: 'PENDING',
    orderDate: new Date().toISOString().split('T')[0],
    totalAmount: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const statuses = ['All', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        console.log("Fetched orders:", data); // Log the fetched data
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const calculateTotal = () => {
    setForm(prev => ({ ...prev, totalAmount: 0 })); // Placeholder, adjust as needed
  };

  // Handle add or update
  const handleSave = async (e) => {
    e.preventDefault();
    // Convert orderDate to LocalDateTime-compatible format
    const formattedDate = `${form.orderDate}T00:00:00`;
    const updatedForm = { ...form, orderDate: formattedDate };
    try {
      const token = localStorage.getItem("token");
      const url = editingId
        ? `/api/orders/${editingId}`
        : '/api/orders';
      const method = editingId ? 'PUT' : 'POST';
      console.log("Sending form:", updatedForm);
      console.log("Token:", token);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedForm)
      });
      if (!response.ok) throw new Error("Save failed");
      const saved = await response.json();
      console.log("Saved order:", saved); // Log the saved order
      setOrders(prev =>
        editingId
          ? prev.map(o => o.orderId === saved.orderId ? saved : o)
          : [...prev, saved]
      );
      setForm({ customerName: '', customerEmail: '', shippingAddress: '', billingAddress: '', status: 'PENDING', orderDate: new Date().toISOString().split('T')[0], totalAmount: 0 });
      setEditingId(null);
      setError(null);
      setIsFormOpen(false);
      setSuccessMessage(editingId ? "Order updated successfully!" : "Order added successfully!");
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Delete failed");
      setOrders(prev => prev.filter(o => o.orderId !== id));
      setSuccessMessage("Order deleted successfully!");
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (order) => {
    setForm({
      customerName: order.customerName || '',
      customerEmail: order.customerEmail || '',
      shippingAddress: order.shippingAddress || '',
      billingAddress: order.billingAddress || '',
      status: order.status || 'PENDING',
      orderDate: order.orderDate ? order.orderDate.split('T')[0] : new Date().toISOString().split('T')[0],
      totalAmount: order.totalAmount || 0
    });
    setEditingId(order.orderId);
    setIsFormOpen(true);
  };

  const filteredOrders = orders.filter(order => {
    // Safely handle undefined properties
    const customerId = order.customerId != null ? order.customerId.toString() : '';
    const orderId = order.orderId != null ? order.orderId.toString() : '';
    const customerName = order.customerName || '';
    const customerEmail = order.customerEmail || '';
    const customerPhone = order.customerPhone || '';

    const matchesSearch = 
      customerId.includes(searchTerm) ||
      orderId.includes(searchTerm) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerPhone.includes(searchTerm);
    
    const matchesStatus = selectedStatus === 'All' || (order.status && order.status === selectedStatus);
    
    console.log("Filtering order:", order, "matchesSearch:", matchesSearch, "matchesStatus:", matchesStatus); // Log filtering
    return matchesSearch && matchesStatus;
  });

  if (loading) return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );

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
                <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
                <p className="text-gray-600 mt-1">Manage your order lifecycle</p>
              </div>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Order
              </button>
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
                  <button onClick={() => setError(null)} className="text-red-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}

            {successMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md"
              >
                <div className="flex justify-between items-center">
                  <p className="text-green-700">{successMessage}</p>
                  <button onClick={() => setSuccessMessage('')} className="text-green-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Order Directory</h2>
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                      <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
                    <p className="mt-1 text-gray-500">{searchTerm ? 'Try adjusting your search' : 'Get started by adding your first order'}</p>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredOrders.map((order) => (
                          <motion.tr 
                            key={order.orderId != null ? order.orderId.toString() : Math.random().toString()} // Fallback key
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.orderId != null ? order.orderId : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.customerName || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              ${order.totalAmount != null ? order.totalAmount.toFixed(2) : '0.00'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.status || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.orderDate || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleEdit(order)}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(order.orderId != null ? order.orderId : null)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Order Form */}
            <div className="lg:col-span-1">
              <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isFormOpen ? 'sticky top-6' : ''}`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {editingId ? 'Edit Order' : 'Add New Order'}
                  </h2>
                  {!isFormOpen && (
                    <button 
                      onClick={() => setIsFormOpen(true)}
                      className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  )}
                </div>

                {isFormOpen && (
                  <motion.form 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleSave}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
                      <input
                        id="customerName"
                        type="text"
                        placeholder="Enter customer name"
                        value={form.customerName}
                        onChange={e => setForm({...form, customerName: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">Customer Email</label>
                      <input
                        id="customerEmail"
                        type="email"
                        placeholder="Enter customer email"
                        value={form.customerEmail}
                        onChange={e => setForm({...form, customerEmail: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">Shipping Address</label>
                      <input
                        id="shippingAddress"
                        type="text"
                        placeholder="Enter shipping address"
                        value={form.shippingAddress}
                        onChange={e => setForm({...form, shippingAddress: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">Billing Address</label>
                      <input
                        id="billingAddress"
                        type="text"
                        placeholder="Enter billing address"
                        value={form.billingAddress}
                        onChange={e => setForm({...form, billingAddress: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        id="status"
                        value={form.status}
                        onChange={e => setForm({...form, status: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        {statuses.slice(1).map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date</label>
                      <input
                        id="orderDate"
                        type="date"
                        value={form.orderDate}
                        onChange={e => setForm({...form, orderDate: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                      <p className="mt-1 py-2 px-3 bg-gray-100 rounded-md">${form.totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="flex space-x-3 pt-2">
                      <button 
                        type="submit" 
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {editingId ? 'Update Order' : 'Add Order'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setForm({ customerName: '', customerEmail: '', shippingAddress: '', billingAddress: '', status: 'PENDING', orderDate: new Date().toISOString().split('T')[0], totalAmount: 0 });
                          setIsFormOpen(false);
                        }}
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;