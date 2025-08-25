// File: reactapp/src/components/CustomerList.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CustomerList = ({ onEdit }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get('/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Failed to fetch customers', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/customers/${id}`);
        setCustomers(customers.filter(c => c.customerId !== id));
      } catch (error) {
        alert('Delete failed');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Total Orders</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => (
          <tr key={customer.customerId}>
            <td className="py-2 px-4 border-b">{`${customer.firstName} ${customer.lastName}`}</td>
            <td className="py-2 px-4 border-b">{customer.email}</td>
            <td className="py-2 px-4 border-b">{customer.totalOrders}</td>
            <td className="py-2 px-4 border-b">
              <button onClick={() => onEdit(customer)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(customer.customerId)} className="text-red-600 hover:underline ml-2">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerList;