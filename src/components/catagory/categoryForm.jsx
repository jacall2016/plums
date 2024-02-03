'use client'
import React from 'react';

function CategoryForm({ title, onEdit, onDelete }) {
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={onEdit}>
        Edit Category
      </button>
      <button onClick={onDelete}>
        Delete Category
      </button>
    </div>
  );
}

export default CategoryForm;
