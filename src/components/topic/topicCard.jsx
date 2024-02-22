import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import deleteTopicButton from './deleteTopicButton.jsx';
import editTopicButton from './editTopicButton.jsx';

const TopicCard = ({ key, customKey, title, description }) => {
  return (
    <Link href={`/Topics/${customKey}`}>
      <div className="bg-white border rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105 bg_card_image-card">
        <div className="p-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <div>
          <deleteTopicButton />
          <editTopicButton />
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;