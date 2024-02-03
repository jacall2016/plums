'use client'
import React from 'react';

import EditSourceButton from './editSourceButton';
import DeleteSourceButton from './deleteSourceButton';

function SourceCard({ title, onEdit, onDelete }) {
  return (
    <div>
      <h2>{title}</h2>
      {/* Display other content related to the source file */}
      <EditSourceButton onClick={onEdit} />
      <DeleteSourceButton onClick={onDelete} />
    </div>
  );
}

export default SourceCard;