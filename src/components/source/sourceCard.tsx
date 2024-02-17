// SourceCard.js
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
    <div className="bg-white h-auto mt-20 w-4/5 border rounded-md overflow-hidden shadow-md hover:scale-105 mx-auto">
      {imageUrl && <img src={imageUrl} alt={title} className="w-full h-auto" />}
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        {url && <a href={url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Visit Source</a>}
        {note && <p className="mt-2">{note}</p>}
      </div>
    </div>
  );
};

export default SourceCard;