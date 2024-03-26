import React, { useState } from 'react';

function UrlForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ title, text, url });
    setTitle('');
    setText('');
    setUrl('');
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
          id="text"
          value={text}
          onChange={handleTextChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="url" className="block text-gray-700 font-bold mb-2">URL:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={handleUrlChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      <button type="submit" className="bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-800 mt-6">Add URL</button>
    </form>
  );
}

export default UrlForm;
