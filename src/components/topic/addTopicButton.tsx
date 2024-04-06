'use client'
import { useState } from "react";
import Image from "next/image";
import NewTopicForm from './topicForm'

interface AddTopicButtonProps {
  parentId: string; // Define parentId as a prop
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const AddTopicButton: React.FC<AddTopicButtonProps> = ({ parentId }) =>{
  const [showForm, setShowForm] = useState(false);
  const [topics, setTopics] = useState([]);

  const toggleFormVisibility = () => {
    setShowForm((prev) => !prev);
  };

  const handleFormSubmit = async (formData : any) => {
    try {
      console.log(formData)
      const response = await fetch('/api/topics', {
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
      if (formData.parentId){
        window.location.href = `/Topics/${formData.parentId}`
      }
      else{
        window.location.href = '/Topics';
      }
      
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
          className="relative"
          src="/images/icons8-add-new-48.png"
          alt="Add Topic"
          id="addTopicButton"
          width={40}
          height={40}
          title="Add Topic"
        />
      </button>

      {showForm && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-80 bg-white p-4 rounded-md shadow-md overflow-y-auto max-h-80 overflow-x-hidden">
          <Image
            className="absolute left-64 ml-2 -top-0"
            onClick={toggleFormVisibility}
            src="/images/x-icon.svg"
            alt="exit icon"
            width={40}
            height={40}
          />
          <NewTopicForm onSubmit={handleFormSubmit} parentId={parentId} />
        </div>
      )}

    </div>
  );
}

export default AddTopicButton;
