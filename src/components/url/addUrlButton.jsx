import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import UrlForm from './UrlForm'; // Corrected the import statement

function AddUrlButton({ onAdd }) {
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (buttonRef.current && !buttonRef.current.contains(event.target)) &&
        (formRef.current && !formRef.current.contains(event.target))
      ) {
        // Clicked outside the button and form, close the form
        setFormVisible(false);
      }
    };

    // Attach the event listeners
    document.addEventListener('mousedown', handleClickOutside);

    // Detach the event listeners when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [buttonRef, formRef]);

  return (
    <div className={`relative inline-block`}>
      <div
        className={`rounded overflow-hidden transition-transform transform p-2 ${formVisible ? 'bg-green-500' : ''}`}
        onClick={handleButtonClick}
        ref={buttonRef}
      >
        <Image src="/images/url.svg" alt="Add url" width={40} height={40} title="Add url" />
      </div>
      {formVisible && (
        <div ref={formRef}>
          <UrlForm onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
}

export default AddUrlButton;
