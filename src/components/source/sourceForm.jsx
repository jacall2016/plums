// Import the necessary modules from the 'react' library
import React, { useState } from 'react';

// Define the functional component 'SourceForm' that takes a prop 'onSubmit'
function SourceForm({ onSubmit }) {
  // State hooks to manage the selected file and the title input
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');

  // Event handler for file input change
  const handleFileChange = (event) => {
    // Set the selected file to the first file in the event's target files array
    setSelectedFile(event.target.files[0]);
  };

  // Event handler for title input change
  const handleTitleChange = (event) => {
    // Set the title state to the value of the title input
    setTitle(event.target.value);
  };

  // Event handler for form submission
  const handleSubmit = () => {
    // Implement your logic for submitting the form data
    // Use the selectedFile state to send the file data
    onSubmit({ title, file: selectedFile });
  };

  // JSX markup for the SourceForm component
  return (
    <div>
      <form>
        {/* Title input field */}
        <h2>Title:</h2>
        <input type="text" value={title} onChange={handleTitleChange} />
        <br />

        {/* File input field for uploading a source file */}
        <input type="file" onChange={handleFileChange} />

        {/* Button to trigger form submission */}
        <button type="button" onClick={handleSubmit}>
          Upload Source
        </button>
      </form>
    </div>
  );
}

// Export the SourceForm component as the default export
export default SourceForm;