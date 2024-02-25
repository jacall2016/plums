import React, { useState } from 'react';

function TextForm({ onSubmit }) {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    // Implement your logic for submitting the form data
    // Use the text state to send the text data
    onSubmit(text);
  };

  return (
    <div>
      <form>
        <h2>Note:</h2>
        <textarea value={text} onChange={handleTextChange} />
        <br />
        <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleSubmit}>
          Upload note
        </button>
      </form>
    </div>
  );
}

export default TextForm;