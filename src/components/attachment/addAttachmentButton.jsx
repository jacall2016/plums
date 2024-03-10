import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import AttachmentForm from './AttachmentForm';

function AddAttachmentButton({ onAdd }) {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef(null);
  const formRef = useRef(null);

  const handleButtonClick = () => {
    setVisible(!visible);
  };

  const handleFormSubmit = (formData) => {
    onAdd(formData);
    setVisible(false);
  };

  const handleFileChange = (event) => {
    // Handle file change logic here
  };

  const handleClick = (event) => {
    // Prevent form hiding when clicking inside the form
    if (
      (formRef.current && formRef.current.contains(event.target)) ||
      (buttonRef.current && buttonRef.current.contains(event.target))
    ) {
      return;
    }

    setVisible(false);
  };

  useEffect(() => {
    // Attach the event listener
    document.addEventListener('mousedown', handleClick);

    // Detach the event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        ref={buttonRef}
        className={`rounded transition-transform transform p-2 ${visible ? 'bg-green-500 transition-transform transform scale-105' : ''}`}
        onClick={handleButtonClick}
      >
        <Image src="/images/upload.svg" alt="Add Attachment" width={40} height={40} title="Add Source" />
      </div>
      {visible && (
        <div ref={formRef}>
          <AttachmentForm onSubmit={handleFormSubmit} />
          {/* Hidden file input for triggering file selection */}
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e)}
          />
        </div>
      )}
    </div>
  );
}

export default AddAttachmentButton;
