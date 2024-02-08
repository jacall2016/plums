// A filter to display different categories
'use client'

import categoriesData from '../../data/categories.json';
import React, { useState, useEffect } from 'react';

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('../data/categories.json');
//         if (!response.ok) {
//           throw new Error('Failed to fetch categories');
//         }

//         const data = await response.json();
//         setCategories(data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <p>Loading categories...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }


  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="" disabled selected>Select a category</option>
      {categoriesData.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryDropdown;

*/
import React, { useState } from 'react';
import categoriesData from '../data/categories.json';

function CategoryDropdown({ categories, onSelect }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onSelect(category);
  };

  return (
    <div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select a Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryDropdown;