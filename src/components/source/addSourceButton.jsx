import React, { useState } from 'react';
import Image from 'next/image';

import AddImageButton from '../image/addImageButton';
import AddAttachmentButton from '../attachment/addAttachmentButton';
import AddTextButton from '../text/addTextButton';
import AddUrlButton from '../url/addUrlButton';

function AddSourceButton() {
  const [showImageButtonForm, setShowImageButtonForm] = useState(false);
  const [showAttachmentButtonForm, setShowAttachmentButtonForm] = useState(false);
  const [showTextButtonForm, setShowTextButtonForm] = useState(false);
  const [showUrlButtonForm, setShowUrlButtonForm] = useState(false);

  return (
    <div className="relative inline-block">
      <div className="flex flex-row">
        <AddImageButton onMouseEnter={() => setShowImageButtonForm(true)} onMouseLeave={() => setShowImageButtonForm(false)} />
        <AddAttachmentButton onMouseEnter={() => setShowAttachmentButtonForm(true)} onMouseLeave={() => setShowAttachmentButtonForm(false)} />
        <AddTextButton onMouseEnter={() => setShowTextButtonForm(true)} onMouseLeave={() => setShowTextButtonForm(false)} />
        <AddUrlButton onMouseEnter={() => setShowUrlButtonForm(true)} onMouseLeave={() => setShowUrlButtonForm(false)} />
      </div>
    </div>
  );
}

export default AddSourceButton;
