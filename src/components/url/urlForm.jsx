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
  };

  return (
    <div className="flex flex-col items-left z-10 absolute"> {/* Changed items-right to items-left */}
      <form className="text-left bg-white p-4 rounded shadow-md absolute top-0 left-0 mt-10"> {/* Changed text-center to text-left */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="border rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-lg font-semibold mb-2">
            Description:
          </label>
          <textarea
            id="text"
            value={text}
            onChange={handleTextChange}
            className="border rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="url" className="block text-lg font-semibold mb-2">
            URL:
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={handleUrlChange}
            className="border rounded py-2 px-3"
          />
        </div>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Add URL
        </button>
      </form>
    </div>
  );
}

export default UrlForm;
