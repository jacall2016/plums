import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import TextForm from './TextForm'; // Corrected the import statement

function AddTextButton({ onAdd }) {
  const [formVisible, setFormVisible] = useState(false);
  const buttonRef = useRef(null);
  const formRef = useRef(null);

  const handleButtonClick = () => {
    setFormVisible(!formVisible);
  };

  const handleFormSubmit = (formData) => {
    onAdd(formData);
    setFormVisible(false);
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      // Clicked outside the button, close the form
      setFormVisible(false);
    }
  };

  useEffect(() => {
    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Detach the event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block`} ref={buttonRef}>
      <div
        className={`rounded overflow-hidden transition-transform transform p-2 ${formVisible ? 'bg-green-500 transition-transform transform scale-105' : ''}`}
        onClick={handleButtonClick}
      >
        <Image src="/images/notePad.svg" alt="Add Text" width={40} height={40} title="Add Note" />
      </div>
      {formVisible && (
        <div ref={formRef}>
          <TextForm onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
}

export default AddTextButton;
