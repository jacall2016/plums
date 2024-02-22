import React, { useState } from 'react';
import Image from 'next/image';

function AddImageButton({ onClick }) {
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
        <Image src="/images/imageIcon.png" alt="Add image" id="addTopicButton" width={40} height={40} title="Add image" />
      </button>
    </div>
  );
}

export default AddImageButton;