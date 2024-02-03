'use client'
import React from 'react';

import EditUrlButton from './editUrlButton';
import DeleteUrlButton from './deleteUrlButton';

function UrlCard({ title, onEdit, onDelete }) {
  return (
    <div>
      <h2>{title}</h2>
      {/* Display other content related to the URL file */}
      <EditUrlButton onClick={onEdit} />
      <DeleteUrlButton onClick={onDelete} />
    </div>
  );
}

export default UrlCard;