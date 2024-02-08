'use client'
import React from 'react';

function topicForm({ onSubmit }) {
    const [title, setTitle] = useState('');
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
  
    const handleSubmit = () => {
      // Implement your logic for submitting the form data
      // Use the selectedFile state to send the file data
      onSubmit({ title });
    };
  
    return (
      <div>
        <form>
          <h2>Title:</h2>
          <input type="text" value={title} onChange={handleTitleChange} />
          <button type="button" onClick={handleSubmit}>
            Upload topic
          </button>
        </form>
      </div>
    );
  }
  
  export default topicForm;