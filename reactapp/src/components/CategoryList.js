// File: reactapp/src/components/CategoryList.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ul className="space-y-2">
      {categories.map(category => (
        <li key={category.categoryId} className="bg-white p-2 shadow rounded">
          {category.categoryName} {category.parentCategory ? `(Parent: ${category.parentCategory.categoryName})` : ''}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;