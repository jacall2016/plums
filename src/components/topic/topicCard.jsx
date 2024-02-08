'use client'


import React from 'react';
import Link from 'next/link';

const TopicCard = ({ key, customKey, title, description }) => {
  return (
    <Link href={`/Topics/${customKey}`}>

      <div className="bg-white border rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105">
          <div className="p-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
      </div>
    </Link>

 // quick change
  );
};

export default TopicCard;

