'use client'
import React from 'react';

function AddCategoryButton({ onClick }) {
  return (
    <button onClick={onClick}>
      Add Category
    </button>
  );
}

export default AddCategoryButton;
