'use client'

import React from 'react';

interface Props {
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
  note?: string;
}

const SourceCard: React.FC<Props> = ({ title, description, imageUrl, url, note }) => {
  return (
    <div className="relative h-auto mt-20 w-4/5 p-4 rounded-md overflow-hidden shadow-md hover:scale-105 mx-auto">
      {/* Image overlay with opacity */}
      <img
        src="/images/plumTopicBox.png"
        alt="Plum Topic Box"
        className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-50"
      />
      {imageUrl && <img src={imageUrl} alt={title} className="w-full h-auto z-10 rounded-md" />}
      <div className="p-4 relative z-20">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        {url && (
          <a
            href={url}
            className="text-blue-800 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Source
          </a>
        )}
        {note && <p className="mt-2">{note}</p>}
      </div>
    </div>
  );
};

export default SourceCard;
