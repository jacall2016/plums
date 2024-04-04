'use client';
import React, { useState } from 'react';
import Image from 'next/image';

function RestoreTopicButton({ onClick }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    if (onClick) {
      onClick();
    }
    
    // Set a timeout to reset the clicked state after a brief period
    setTimeout(() => {
      setClicked(false);
    }, 500); // Adjust the duration as needed (500 milliseconds in this example)
  };

  return (
    <div className={`relative inline-block rounded-md ${clicked ? 'bg-green-500' : ''}`}>
      <button
        className={`overflow-hidden transition-transform transform hover:scale-105 p-2`}
        onClick={handleClick}
      >
        <h1>Restore</h1>
      </button>
    </div>
  );
}

export default RestoreTopicButton;
