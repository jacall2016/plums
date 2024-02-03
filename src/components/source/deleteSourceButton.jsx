'use client'
import React from 'react';

function DeleteSourceButton({ onClick }) {
    return (
      <button onClick={onClick}>
        Delete Source
      </button>
    );
  }
  
  export default DeleteSourceButton;