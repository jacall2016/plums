'use client'
import React from 'react';
import EditCategoryButton from './editCategoryButton';
import DeleteCategoryButton from './deleteCategoryButton';

function CategoryCard({ title, onEdit, onDelete }) {
  return (
    <div>
      <h2>{title}</h2>
      {/* Display other content related to the Category file */}
      <EditCategoryButton onClick={onEdit} />
      <DeleteCategoryButton onClick={onDelete} />
    </div>
  );
}

export default CategoryCard;
