'use client';
import React, { useState, useEffect } from 'react';

function EditImageForm({onSubmit, initialData }) {
  const [id, setId] = useState('');
  const [topicId, setTopicId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhoto] = useState(null);

  useEffect(() => {
    if (initialData) {
      setId(initialData.id || '');
      setTopicId(initialData.topicId || '');
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setPhoto(initialData.photos || null);
    }
  }, [initialData]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({id, topicId, title, description, photos });
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
        {photos && (
          <img src={photos} alt="Uploaded Image" className="max-w-20 h-auto mb-4" />
        )}
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
    </form>
  );
}

export default EditImageForm;
