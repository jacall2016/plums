'use client'
import React, { useState, useEffect } from 'react';
import { Topics } from '@prisma/client';

function AttachmentForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttatchment] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAttatchmentChange = (event) => {
    //console.log("attatchments: " + event.target.files);

    setAttatchment(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ attachments, title, description });
    setTitle('');
    setDescription('');
    setAttatchment('');
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
        <label htmlFor="text" className="block text-gray-700 font-bold mb-2">Description:</label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="attachment" className="block text-gray-700 font-bold mb-2">Select Attachment:</label>
        <input
          type="text"
          id="attachment"
          value={attachments}
          onChange={handleAttatchmentChange}
          className="mb-4"
        />
      </div>
      <button type="submit" className="bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-800 mt-6">Upload Attachment</button>
    </form>
  );
}

export default AttachmentForm;
