import React from 'react';
import { Sources } from '@prisma/client';
import DeleteSourceButton from './DeleteSourceButton'; // Import the delete button component
import EditSourceButton from './EditSourceButton'; // Import the edit button component

interface Props {
  source: Sources;
}

const SourceCard: React.FC<Props> = ({ source }) => {
  console.log(source);
  const { id, title, description, photos, urls, notes } = source;

  return (
    <div className="relative h-auto mt-20 w-4/5 p-4 rounded-md overflow-hidden shadow-md hover:scale-105 mx-auto">
      
      
      {/* Image overlay with opacity */}
      <img
        src="/images/plumTopicBox.png"
        alt="Plum Topic Box"
        className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-50"
      />

      {photos && <img src={photos} className="w-full h-auto z-10 rounded-md" />}
      <div>
        <div className="mb-3.5 z-0 absolute top-0 left-0 flex items-start rounded-md rounded-br-full bg-white">
          <EditSourceButton onClick={undefined}/>
          <DeleteSourceButton onClick={undefined}/>
        </div>
        <div className="p-4 z-0 pt-12 relative">
          <h3 className="text-xl  text-white font-semibold">{title}</h3>
          <p className="text-white">{description}</p>
          {urls && (
            <a
              href={urls}
              className="text-white hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Source
            </a>
          )}
          {notes && <p className="mt-2 text-white">{notes}</p>}
        </div>
      </div>
    </div>
  );
};

export default SourceCard;