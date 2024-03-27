"use client"

import React, { useState, useEffect } from 'react';
import { Topics, CategoryToTopic, Categories } from '@prisma/client';

interface Props {
  topic: Topics; // Topic data fetched for editing
  topicCategories: CategoryToTopic[]; // Categories connected to the topic
  onSubmit: (editedTopic: Topics) => void;
}

const EditTopicForm: React.FC<Props> = ({ topic, topicCategories, onSubmit }) => {
  const [title, setTitle] = useState(topic.title || '');
  const [description, setDescription] = useState(topic.description || '');
  const [selectedCategories, setSelectedCategories] = useState<CategoryToTopic[]>(topicCategories || []);
  const [categories, setCategories] = useState<Categories[]>([]);

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

  useEffect(() => {
    setTitle(topic.title || '');
    setDescription(topic.description || '');
    setSelectedCategories(topicCategories || []); // Set initial selectedCategories from props
  }, [topic, topicCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form inputs
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
  
    // Construct topic object with updated category relationships
    const updatedCategories = selectedCategories.map((ct) => ({
      categoryId: ct.categoryId,
      topicId: topic.id,
    }));
  
    const updatedTopic: any = {
      ...topic,
      title,
      description,
      categories: updatedCategories,
    };
  
    // Call onSubmit callback with updated topic data
    onSubmit(updatedTopic);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = Array.from(e.target.selectedOptions, (option) => option.value);
    const updatedCategories: CategoryToTopic[] = selectedIds.map((categoryId) => ({
      id: categoryId, // Assuming categoryId is also the id
      categoryId: categoryId,
      topicId: topic.id,
    }));
    setSelectedCategories(updatedCategories);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
          Category Tags:
        </label>
        <h5 className="-mt-2">Ctrl + Click for Multiple</h5>
        <select
          multiple
          id="category"
          value={selectedCategories.map((ct) => ct.categoryId)}
          onChange={handleCategoryChange}
          className="w-full px-3 py-2 rounded-md border border-purple-300 focus:outline-none focus:border-purple-500 text-gray-700"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-2">Selected Categories:</label>
        <ul className="flex flex-wrap justify-evenly text-gray-700">
          {selectedCategories.map((ct, index) => {
            const category = categories.find((cat) => cat.id === ct.categoryId);
            return (
              <li key={index} onDoubleClick={() => setSelectedCategories((prev) => prev.filter((p) => p !== ct))}>
                {category ? category.name : 'Unknown Category'}
              </li>
            );
          })}
        </ul>
      </div>
      <button type="submit" className="bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-800 mt-6">
        Update Topic
      </button>
    </form>
  );
};

export default EditTopicForm;
