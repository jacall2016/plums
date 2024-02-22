'use client';

import categoriesData from '../../data/categories.json';
import React, { useState, useEffect } from 'react';

const CategoryDropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Uncomment this block if you want to fetch data dynamically
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('../data/categories.json');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch categories');
  //       }

  //       const data = await response.json();
  //       setCategories(data);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <select
      onChange={(e) => setSelectedCategory(e.target.value)}
      value={selectedCategory}
      className="h-10 px-4 border rounded-md"
    >
      <option value="" defaultValue>
        Select a category
      </option>
      {categoriesData.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryDropdown;