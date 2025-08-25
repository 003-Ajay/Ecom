// File: reactapp/src/components/OrderList.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';

const OrderList = ({ onView }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">Customer</th>
          <th className="py-2 px-4 border-b">Total</th>
          <th className="py-2 px-4 border-b">Status</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.orderId}>
            <td className="py-2 px-4 border-b">{order.orderId}</td>
            <td className="py-2 px-4 border-b">{order.customerName}</td>
            <td className="py-2 px-4 border-b">${order.totalAmount}</td>
            <td className="py-2 px-4 border-b">{order.status}</td>
            <td className="py-2 px-4 border-b">
              <button onClick={() => onView(order)} className="text-blue-600 hover:underline">View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;