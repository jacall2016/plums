import React from 'react';

function DeleteTopicButton({ onClick }) {
  return (
    <button onClick={onClick}>
      Delete
    </button>
  );
}

export default DeleteTopicButton;