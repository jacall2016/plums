import React, { useState } from "react";
import Image from "next/image";
//import useClient from './useClient'; // Import the custom hook
import AttachmentForm from './AttachmentForm'; // Corrected the import statement

function AddAttachmentButton() {
  const [showForm, setShowForm] = useState(false);
  //const client = useClient(); // Initialize the custom hook

  const toggleFormVisibility = () => {
    setShowForm((prev) => !prev);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await client.fetch('/api/sources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to upload attachment');
      }
      const data = await response.json();
      // Optionally update the state or do any other actions after successful upload
      console.log('Attachment uploaded:', data);
      toggleFormVisibility();
      // Perform any additional actions after successful upload
    } catch (error) {
      console.error('Error uploading Attachment:', error);
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleFormVisibility}>
        {/* Add your icon or button for adding image */}
        <Image
          className="relative left-2"
          src="/images/upload.svg"
          alt="Add Attachment Icon"
          width={40}
          height={40}
          title="Add Attachment"
        />
      </button>

      {showForm && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-80 bg-white p-4 rounded-md shadow-md">
          <Image
            className="absolute right-4 top-4 cursor-pointer"
            onClick={toggleFormVisibility}
            src="/images/x-icon.svg"
            alt="exit icon"
            width={24}
            height={24}
          />
          <AttachmentForm onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
}

export default AddAttachmentButton;