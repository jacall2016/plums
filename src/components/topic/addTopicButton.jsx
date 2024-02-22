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
      className="relative"
      onMouseEnter={showAddButtonList}
      onMouseLeave={hideAddButtonList}
      onClick={() => window.innerWidth < 768 && setShowButtons(!showButtons)}
    >
      <button className={`rounded-full overflow-hidden shadow-md transition-transform transform hover:scale-105`}>
        <Image src="/images/greenPlumn.png" alt="Add Topic" id="addTopicButton" width={40} height={40} />
      </button>
      {showButtons && (
        <div className="absolute top-10 right-0 z-10">
          {/* Adjust the positioning and styling based on your layout */}
          <AddImageButton />
          <AddSourceButton />
          <AddTextButton />
          <AddUrlButton />
        </div>
      )}
    </div>
  );
}

export default AddTopicButton;