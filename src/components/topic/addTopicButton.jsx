'use client'
import React from 'react';

function AddTopicButton({ onClick }) {
    return (
      <button onClick={onClick}>
        Add Topic
      </button>
    );
  }
  
  export default AddTopicButton;