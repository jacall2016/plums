'use client'
import React, { useState } from 'react';

function SourceForm({ onSubmit }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
  
    const handleSubmit = () => {
      // Implement your logic for submitting the form data
      // Use the selectedFile state to send the file data
      onSubmit({ title, file: selectedFile });
    };
  
    return (
      <div>
        <form>
          <h2>Title:</h2>
          <input type="text" value={title} onChange={handleTitleChange} />
          <br />
          <input type="file" onChange={handleFileChange} />
          <button type="button" onClick={handleSubmit}>
            Upload Source
          </button>
        </form>
      </div>
    );
  }
  
  export default SourceForm;