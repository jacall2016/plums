'use client'
import React from 'react';

import EditTextButton from './editTextButton';
import DeleteTextButton from './deleteTextButton';

function TextCard({ title, onEdit, onDelete }) {
  return (
    <div>
      <h2>{title}</h2>
      {/* Display other content related to the text file */}
      <EditTextButton onClick={onEdit} />
      <DeleteTextButton onClick={onDelete} />
    </div>
  );
}

export default TextCard;