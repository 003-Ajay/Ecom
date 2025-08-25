// File: reactapp/src/components/OrderDetails.js

import React from 'react';

const OrderDetails = ({ order, onUpdateStatus }) => {
  if (!order) return null;

  return (
    <div className="bg-white p-4 shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Order #{order.orderId}</h2>
      <p>Customer: {order.customerName}</p>
      <p>Email: {order.customerEmail}</p>
      <p>Total: ${order.totalAmount}</p>
      <p>Status: {order.status}</p>
      <button onClick={() => onUpdateStatus(order.orderId, 'SHIPPED')} className="bg-blue-600 text-white px-3 py-1 rounded mt-2">Update to Shipped</button>
      {/* Add more details like items, shipping */}
    </div>
  );
};

export default OrderDetails;