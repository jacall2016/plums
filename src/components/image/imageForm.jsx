import React, { useState } from 'react';

function ImageForm({ onSubmit }) {
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
  };

  return (
    <div className="flex flex-col items-left z-10 relative mt-10"> {/* Changed items-center to items-left */}
      <form className="bg-white p-4 rounded shadow-md text-left absolute top-0 left-0"> {/* Changed text-center to text-left */}
        <label htmlFor="title" className="block text-lg font-semibold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="border rounded py-2 px-3 mb-4"
        />
        <p className="mb-2">Description:</p> {/* No need to change alignment for this */}
        <textarea
          value={text}
          onChange={handleTextChange}
          className="border rounded py-2 px-3 mb-4"
        />
        <label htmlFor="image" className="block text-lg font-semibold mb-2">
          Select Image:
        </label>
        <input
          type="file"
          id="image"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Upload Image
        </button>
      </form>
    </div>
  );
}

export default ImageForm;
