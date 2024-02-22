'use client'
import React, { useState } from 'react';
import Image from 'next/image';

import AddImageButton from '../image/addImageButton.jsx';
import AddSourceButton from '../source/addSourceButton.jsx';
import AddTextButton from '../text/addTextButton.jsx';
import AddUrlButton from '../url/addUrlButton.jsx';

function AddTopicButton() {
  const [showButtons, setShowButtons] = useState(false);

  const showAddButtonList = () => {
    setShowButtons(true);
  };

  const hideAddButtonList = () => {
    setShowButtons(false);
  };

  return (
    <div
      className={`relative rounded-md inline-block transition-all duration-300 ${
        showButtons ? 'bg-purple-800 bg-opacity-100 p-4 h-[330px]' : 'bg-purple-800 bg-opacity-0 p-0 h-10'
      }`}
      onMouseEnter={showAddButtonList}
      onMouseLeave={hideAddButtonList}
    >
      <button
        className={`overflow-hidden rounded-md p-2`}
        onClick={() => window.innerWidth < 768 && setShowButtons(!showButtons)}
      >
        <Image src="/images/greenPlumn.png" alt="Add Topic" id="addTopicButton" width={40} height={40} title="Add Topic"/>
      </button>
      <div
        className={`absolute z-10 space-y-2 md:right-12 md:top-0 md:space-y-0 ${
          showButtons ? 'visible opacity-100' : 'invisible opacity-0'
        } transition-all duration-300`}
      >
        {/* Adjust the positioning and styling based on your layout */}
        <AddImageButton />
        <AddSourceButton />
        <AddTextButton />
        <AddUrlButton />
      </div>
    </div>
  );
}

export default AddTopicButton;
