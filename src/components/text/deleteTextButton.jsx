'use client'
import React from 'react';

function DeleteTextButton({ onClick }) {
    return (
      <button onClick={onClick}>
        Delete Text
      </button>
    );
  }
  
  export default DeleteTextButton;