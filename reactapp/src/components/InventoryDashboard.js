// File: reactapp/src/components/InventoryDashboard.js

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InventoryDashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      // Assume API endpoint for inventory analytics; stub data for now
      setInventoryData([
        { name: 'Product A', stock: 400 },
        { name: 'Product B', stock: 300 },
        // Fetch from /inventory or aggregate from products
      ]);
    };
    fetchInventory();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Inventory Levels</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={inventoryData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stock" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryDashboard;