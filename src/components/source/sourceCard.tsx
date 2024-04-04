'use client';
import React from 'react';
import { Sources } from '@prisma/client';
import DeleteSourceButton from './deleteSourceButton.jsx';
import EditSourceButton from './editSourceButton';

interface EditSourceButtonProps {
  source: Sources;
  onDelete: (sourceId: string) => void; // Define the onDelete prop type
  onEdit: (sourceId: string) => void;
}

const SourceCard: React.FC<EditSourceButtonProps> = ({ source, onDelete, onEdit}) => {
  const { id, title, description, photos, urls, notes, attachments } = source;

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id); // Correct usage of onDelete with the source id
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(id);
    }
  };

  return (
    <div className="z-0 relative h-auto mt-20 w-4/5 p-4 rounded-md overflow-hidden shadow-md mx-auto">
      {/* Image overlay with opacity */}
      <img
        src="/images/plumTopicBox.png"
        alt="Plum Topic Box"
        className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-50"
      />
      {photos && <img src={photos} alt={photos} className="w-full h-auto z-10 rounded-md" />}
      <div>
        <div className="mb-3.5 z-0 absolute top-0 left-0 flex items-start rounded-md rounded-br-full bg-white">
          <EditSourceButton  onClick={handleEdit} source={source} />
          <DeleteSourceButton onClick={handleDelete} /> {/* Pass handleDelete */}
        </div>
        <div className="p-4 z-0 pt-12 relative">
          <h3 className="text-xl text-white font-semibold">{title}</h3>
          <p className="text-white">{description}</p>
          {attachments && (
            <a 
              href={attachments} 
              className="text-white hover:underline" 
              target="_blank" 
              rel="noopener noreferrer"
              >
                {attachments}
              </a>)} 
          {urls && (
            <a
              href={urls}
              className="text-white hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {urls}
            </a>
          )}
          {notes && <p className="mt-2 text-white">{notes}</p>}
        </div>
      </div>
    </div>
  );
};

export default SourceCard;
