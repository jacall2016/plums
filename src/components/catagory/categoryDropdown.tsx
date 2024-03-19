"use client"

import React, { useEffect, useState } from 'react';
import { Categories } from '@prisma/client';
import Image from 'next/image';

interface CategoryDropdownProps {
  onSelectCategory: (categoryId: string) => void;
  filterClear: () => void; // Function to clear filter
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ onSelectCategory, filterClear }) => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null); // Deselect the category if already selected
      onSelectCategory(''); // Apply logic to filter topics here
    } else {
      setSelectedCategory(categoryId);
      onSelectCategory(categoryId); // Apply logic to filter topics here
    }
  };

  const handleFilterClear = () => {
    setSelectedCategory(null); // Clear the selected category
    filterClear(); // Call the filter clear function
  };

  const handleCategoryDelete = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/categories/?categoryId=${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete topic');
      }
      const data = await response.json();
      setCategories(data.data);
      // Assuming successful deletion, update the topics state or refetch data
      // Example: refetch data
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  return (
    <div className="filter-buttons flex flex-wrap justify-center">
      {categories.map(category => (
        <div
          key={category.id}
          className="m-2 flex relative"
          onMouseEnter={() => setShowDelete(category.id)}
          onMouseLeave={() => setShowDelete(null)}
        >
          <button
            onClick={() => handleCategoryClick(category.id)}
            className={`btn-filter ${selectedCategory === category.id ? 'btn-filter-active' : ''}`}
          >
            {category.name}
          </button>
          {showDelete === category.id && (
            <span className='ml-2 hover:bg-white rounded-lg'>
              <Image
                onClick={() => handleCategoryDelete(category.id)}
                src="/images/x-icon.svg"
                className='mt-1'
                alt="exit icon"
                width={20}
                height={20}
              />
            </span>
          )}
        </div>
      ))}
      {/* Add a clear filter button */}
      <div className="m-2 flex relative">
        <button
          onClick={handleFilterClear}
          className={`btn-filter ${selectedCategory === null ? 'btn-filter-active' : ''}`}
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default CategoryDropdown;

