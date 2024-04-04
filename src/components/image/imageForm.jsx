import React, { useState } from 'react';

function ImageForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhoto] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      // When the file is loaded, convert it to a base64 string and set the state
      const fileString = reader.result;
      setPhoto(fileString);
    };
  
    // Read the file as a data URL (base64 encoded string)
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    onSubmit({ photos, title, description });
    setTitle('');
    setDescription('');
    setPhoto(null);
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
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Select Image:</label>
        <input
          type="file"
          id="image"
          onChange={handlePhotoChange}
          className="mb-4"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload Image</button>
    </form>
  );
}

export default ImageForm;
