'use client'
import React from 'react';

function DeleteImageButton({ onClick }) {
    return (
      <button onClick={onClick}>
        Delete Image
      </button>
    );
  }
  
  export default DeleteImageButton;