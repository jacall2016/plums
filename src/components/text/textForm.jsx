'use client'
import React, { useState } from 'react';

function TextForm({ onSubmit }) {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
  
    const handleTextChange = (event) => {
      setText(event.target.value);
    };
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
  
    const handleSubmit = () => {
      // Implement your logic for submitting the form data
      // Use the text and title states to send the text data
      onSubmit({ title, text });
    };
  
    return (
      <div>
        <form>
          <h2>Title:</h2>
          <input type="text" value={title} onChange={handleTitleChange} />
          <br />
          <h2>Text:</h2>
          <textarea value={text} onChange={handleTextChange} />
          <br />
          <button type="button" onClick={handleSubmit}>
            Save Text
          </button>
        </form>
      </div>
    );
  }
  
  export default TextForm;