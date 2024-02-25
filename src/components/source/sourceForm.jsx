import React, { useState } from 'react';

function SourceForm({ onSubmit }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Implement your logic for submitting the form data
    // Use the selectedFile state to send the image data
    onSubmit(selectedFile);
  };

  return (
    <div>
      <form>
        <input type="file" onChange={handleFileChange} />
        <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleSubmit}>
          Upload Source
        </button>
      </form>
    </div>
  );
}

export default SourceForm;