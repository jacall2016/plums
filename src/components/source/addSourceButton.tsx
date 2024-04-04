'use client'
import React, { useState } from 'react';
import Image from 'next/image';

import AddImageButton from '../image/addImageButton';
import AddAttachmentButton from '../attachment/addAttachmentButton';
import AddTextButton from '../text/addTextButton';
import AddUrlButton from '../url/addUrlButton';
import AddTopicButton from '../topic/addTopicButton';

// Define the prop type for AddSourceButton
interface AddSourceButtonProps {
  customKey: string; // Define customKey prop
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function AddSourceButton(props: AddSourceButtonProps) {
  const [showTopicButtonForm, setShowTopicButtonForm] = useState(false);
  const [showImageButtonForm, setShowImageButtonForm] = useState(false);
  const [showAttachmentButtonForm, setShowAttachmentButtonForm] = useState(false);
  const [showTextButtonForm, setShowTextButtonForm] = useState(false);
  const [showUrlButtonForm, setShowUrlButtonForm] = useState(false);

  return (
    <div className="relative inline-block">
      <div className="flex flex-row">
        <AddTopicButton parentId={props.customKey} onMouseEnter={() => setShowTopicButtonForm(true)} onMouseLeave={() => setShowTopicButtonForm(false)} />
        <AddImageButton customKey={props.customKey} onMouseEnter={() => setShowImageButtonForm(true)} onMouseLeave={() => setShowImageButtonForm(false)} />
        <AddAttachmentButton customKey={props.customKey} onMouseEnter={() => setShowAttachmentButtonForm(true)} onMouseLeave={() => setShowAttachmentButtonForm(false)} />
        <AddTextButton customKey={props.customKey} onMouseEnter={() => setShowTextButtonForm(true)} onMouseLeave={() => setShowTextButtonForm(false)} />
        <AddUrlButton customKey={props.customKey} onMouseEnter={() => setShowUrlButtonForm(true)} onMouseLeave={() => setShowUrlButtonForm(false)} />
      </div>
    </div>
  );
}

export default AddSourceButton;
