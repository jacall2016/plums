import React from 'react';
import Image from 'next/image';

function AddImageButton({ onClick }) {
  return (
    <button className={`rounded-full overflow-hidden shadow-md transition-transform transform hover:scale-105`}>
      <Image src="/images/imageIcon.png" alt="Add Topic" id="addTopicButton" width={40} height={40} />
    </button>
  );
}

export default AddImageButton;