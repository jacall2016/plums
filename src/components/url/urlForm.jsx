import React, { useState } from 'react';

function UrlForm({ onSubmit }) {
  const [url, setUrl] = useState(''); // Add this line for state

  const handleUrlChange = (event) => {
    setUrl(event.target.value); // Add this line to set the URL state
  };

  const handleSubmit = () => {
    // Implement your logic for submitting the form data
    // Use the url state to send the URL data
    onSubmit(url);
  };

  return (
    <div>
      <form>
        <h2>URL:</h2>
        <input type="text" value={url} onChange={handleUrlChange} />
        <br />
        <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleSubmit}>
          Add URL
        </button>
      </form>
    </div>
  );
}

export default UrlForm;
