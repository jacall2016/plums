'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import EditTextForm from '../text/editTextForm'; // Import your form component for editing text data
import EditPhotosForm from '../image/editImageForm'; // Import your form component for editing photos
import EditUrlsForm from '../url/editUrlForm'; // Import your form component for editing URLs
import EditAttachmentsForm from '../attachment/editAttachmentForm'; // Import your form component for editing attachments

function EditSourceButton({ onClick, source }) {
  const [clicked, setClicked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null);

  const handleClick = () => {
    setClicked(true);
    if (onClick) {
      onClick();
    }
    
    // Set a timeout to reset the clicked state after a brief period
    setTimeout(() => {
      setClicked(false);
    }, 500); // Adjust the duration as needed (500 milliseconds in this example)

    // Show the appropriate form based on the source data
    if (source) {
      if (source.photos) {
        setFormType('photos');
      } else if (source.notes) {
        setFormType('notes');
      } else if (source.urls) {
        setFormType('urls');
      } else if (source.attachments) {
        setFormType('attachments');
      }
      setShowForm(true);
    }
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch('/api/sources', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update source');
      }
      const data = await response.json();
      
      //window.location.reload();

      toggleFormVisibility();
    } catch (error) {
      console.error('Error updating source:', error);
    }
  }

  return (
    <div className={`relative inline-block rounded-md ${clicked ? 'bg-green-500' : ''}`}>
      <button className={`overflow-hidden transition-transform transform hover:scale-105 p-2`} onClick={handleClick}>
        <Image src="/images/yellowPlumn.svg" alt="Edit Topic" id="editTopicButton" width={40} height={40} title="Edit Topic"/>
      </button>
      {showForm && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-80 bg-white p-4 rounded-md shadow-md">
          <Image
            className="absolute right-4 top-4 cursor-pointer"
            onClick={toggleFormVisibility}
            src="/images/x-icon.svg"
            alt="exit icon"
            width={24}
            height={24}
          />
          {/* Render the appropriate form based on the formType */}
          {formType === 'photos' && <EditPhotosForm onSubmit={handleFormSubmit} initialData={source} />}
          {formType === 'notes' && <EditTextForm onSubmit={handleFormSubmit} initialData={source} />}
          {formType === 'urls' && <EditUrlsForm onSubmit={handleFormSubmit} initialData={source} />}
          {formType === 'attachments' && <EditAttachmentsForm onSubmit={handleFormSubmit} initialData={source} />}
        </div>
      )}
    </div>
  );
}

export default EditSourceButton;
