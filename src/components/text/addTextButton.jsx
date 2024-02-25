import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import TextForm from './TextForm'; // Import your TextForm component

function AddTextButton({ onAdd }) {
  const [clicked, setClicked] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    setClicked(true);
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
        event.target.tagName !== 'TEXTAREA' &&
        event.target.tagName !== 'BUTTON'
      ) {
        // Clicked outside the button and not on a textarea or button, close the form
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
        <Image src="/images/notePad.png" alt="Add Text" width={40} height={40} title="Add Note" />
      </button>
      {clicked && (
        <>
          <TextForm onSubmit={handleFormSubmit} />
        </>
      )}
    </div>
  );
}

export default AddTextButton;