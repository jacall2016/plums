'use client'
import React from 'react';

function DeleteUrlButton({ onClick }) {
    return (
      <button onClick={onClick}>
        Delete URL
      </button>
    );
  }
  
  export default DeleteUrlButton;