'use client'
import React from 'react';

function DeleteCategoryButton({ onClick }) {
  return (
    <button onClick={onClick}>
      Delete Category
    </button>
  );
}

export default DeleteCategoryButton;
