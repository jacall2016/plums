'use client'
import React, { useState, useEffect } from 'react';
import { Topics } from '@prisma/client';

function TextForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNote] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ title, description, notes });
    setTitle('');
    setDescription('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="note" className="block text-gray-700 font-bold mb-2">Note:</label>
        <textarea
          id="note"
          value={notes}
          onChange={handleNoteChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload note</button>
    </form>
  );
}

export default TextForm;
