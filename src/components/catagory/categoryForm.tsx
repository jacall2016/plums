'use client'
import React, { useState } from 'react';

interface NewCategoryFormProps {
  onSubmit: (formData: { name: string }) => void;
}

const NewCategoryForm: React.FC<NewCategoryFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form inputs
    if (!name.trim()) {
      alert('Please enter a category name');
      return;
    }
    // Call onSubmit callback with form data
    onSubmit({ name });
    // Reset form fields
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-md text-black">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Category Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      <button type="submit" className="bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-800 mt-6">Add Category</button>
    </form>
  );
};

export default NewCategoryForm;