// File: reactapp/src/components/ProductList.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter(p => p.productId !== id));
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
          <th className="py-2 px-4 border-b">Price</th>
          <th className="py-2 px-4 border-b">Stock</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.productId}>
            <td className="py-2 px-4 border-b">{product.name}</td>
            <td className="py-2 px-4 border-b">${product.price}</td>
            <td className="py-2 px-4 border-b">{product.stockQuantity}</td>
            <td className="py-2 px-4 border-b">
              <button onClick={() => onEdit(product)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(product.productId)} className="text-red-600 hover:underline ml-2">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;