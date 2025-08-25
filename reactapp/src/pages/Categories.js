// File: reactapp/src/pages/Categories.js

import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CategoryList from '../components/CategoryList';

const Categories = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 ml-64 bg-gray-100">
          <h1 className="text-3xl font-bold mb-4">Categories</h1>
          <CategoryList />
          {/* Add form for CRUD */}
        </main>
      </div>
    </div>
  );
};

export default Categories;