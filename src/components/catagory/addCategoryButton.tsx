'use client'
import { useState } from "react";
import Image from "next/image";
import NewCategoryForm from './categoryForm'

function AddTopicButton() {
  const [showForm, setShowForm] = useState(false);
  const [topics, setTopics] = useState([]);

  const toggleFormVisibility = () => {
    setShowForm((prev) => !prev);
  };

  const handleFormSubmit = async (formData : any) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create topic');
      }
      const data = await response.json();
      // Optionally update the state or do any other actions after successful creation
      console.log('Topic created:', data);
      toggleFormVisibility();
      window.location.href = '/Topics';
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleFormVisibility}
      >
        {/* Add your icon or button for adding topic */}
        <Image
          className="relative left-2"
          src="/images/icons8-add-new-50.png"
          alt="Add Topic"
          id="addTopicButton"
          width={40}
          height={40}
          title="Add Topic"
        />
      </button>

      {showForm && (
        <div className="absolute right-14 top-0 z-10 w-80 bg-white p-4 rounded-md shadow-md">
          <Image
          className="absolute left-64 ml-2 -top-0"
          onClick={toggleFormVisibility}
          src="/images/x-icon.svg"
          alt="exit icon"
          width={40}
          height={40}>

          </Image>
          <NewCategoryForm onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
}

export default AddTopicButton;