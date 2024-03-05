// src/components/categoryDropdown.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { Categories } from '@prisma/client';


function CategoryDropdown() {
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/categories');
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        console.log(data)
        console.log(data.data)
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <select>
        <option value="">Select a category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryDropdown;
