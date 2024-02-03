'use client'
import React, { useState } from 'react';

function UrlForm({ onSubmit }) {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
  
    const handleUrlChange = (event) => {
      setUrl(event.target.value);
    };
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
  
    const handleSubmit = () => {
      // Implement your logic for submitting the form data
      // Use the url and title states to send the URL data
      onSubmit({ title, url });
    };
  
    return (
      <div>
        <form>
          <h2>Title:</h2>
          <input type="text" value={title} onChange={handleTitleChange} />
          <br />
          <h2>URL:</h2>
          <input type="url" value={url} onChange={handleUrlChange} />
          <br />
          <button type="button" onClick={handleSubmit}>
            Save URL
          </button>
        </form>
      </div>
    );
  }
  
  export default UrlForm;