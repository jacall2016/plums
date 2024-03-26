import React, { useState } from 'react';

function AttachmentForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    onSubmit({ selectedFile, title, text });
    setTitle('');
    setText('');
    setSelectedFile(null);
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
          value={text}
          onChange={handleTextChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="attachment" className="block text-gray-700 font-bold mb-2">Select Attachment:</label>
        <input
          type="file"
          id="attachment"
          onChange={handleFileChange}
          className="mb-4"
        />
      </div>
      <button type="submit" className="bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-800 mt-6">Upload Attachment</button>
    </form>
  );
}

export default AttachmentForm;
