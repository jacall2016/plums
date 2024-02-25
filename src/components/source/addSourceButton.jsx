import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import SourceForm from './SourceForm'; // Import your SourceForm component

function AddSourceButton({ onAdd }) {
  const [clicked, setClicked] = useState(false);
  const buttonRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    setClicked(true);
    // Programmatically trigger a click on the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFormSubmit = (formData) => {
    onAdd(formData);
    setClicked(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        event.target.tagName !== 'INPUT' &&
        event.target.tagName !== 'BUTTON'
      ) {
        // Clicked outside the button and not on an input or button, close the form
        setClicked(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Detach the event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [buttonRef]);

  return (
    <div className={`relative inline-block rounded-md ${clicked ? 'bg-green-500' : ''}`}>
      <button
        ref={buttonRef}
        className={`overflow-hidden transition-transform transform hover:scale-105 p-2`}
        onClick={handleClick}
      >
        <Image src="/images/upload.png" alt="Add Source" width={40} height={40} title="Add Source" />
      </button>
      {clicked && (
        <>
          <SourceForm onSubmit={handleFormSubmit} />
          {/* Hidden file input for triggering file selection */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e)}
          />
        </>
      )}
    </div>
  );
}

export default AddSourceButton;
