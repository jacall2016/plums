// TopicCard.jsx

import React, { useState } from 'react';
import DeleteTopicButton from './deleteTopicButton.jsx'; // Import the delete button component
import RestoreTopicButton from './restoreTopicButton'
import Image from 'next/image';
import Link from 'next/link';

const RecentlyDeletedTopicCard = ({ customKey, title, description, onDelete, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileClicked, setIsMobileClicked] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMobileClick = () => {
    setIsMobileClicked(!isMobileClicked);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(customKey);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(customKey);
    }
  };



  return (
    <div>
      <div
        className={`relativ p-4 rounded-2xl transition-transform transform hover:scale-105 ${
          isMobileClicked ? 'md:hover:scale-105' : '' // For mobile view, apply hover effect on click
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMobileClick}
        style={{ height: '200px', width: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative' }}
      >
        {/* Render delete and edit buttons only when hovered or clicked */}
        {(isHovered) && (
          <div className="absolute top-0 left-0 z-20 p-2 flex items-start rounded-md rounded-br-full bg-white">
            <DeleteTopicButton onClick={handleDelete} />
            <RestoreTopicButton onClick={handleEdit}/>
          </div>
        )}

        {/* Image overlay with opacity */}
        <img
          src="/images/plumTopicBox.png"
          alt="Plum Topic Box"
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        />

        {/* Rest of the card content */}
        <Link href={`/Topics/${customKey}`}>
          <div className="relative z-10 text-white">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-white">{description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RecentlyDeletedTopicCard;
