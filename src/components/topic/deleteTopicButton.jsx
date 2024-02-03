'use client'
import React from 'react';

function DeleteTopicButton({ onClick }) {
    return (
      <button onClick={onClick}>
        Delete Topic
      </button>
    );
  }
  
  export default DeleteTopicButton;