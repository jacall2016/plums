'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import recentlyDeletedData from '../../data/recentlyDeleted.json';
import TopicCard from './topicCard';

const DeletedTopicList = () => {
  const [recentlyDeleted, setRecentlyDeleted] = useState(recentlyDeletedData);

  useEffect(() => {
    setRecentlyDeleted(recentlyDeletedData);
  }, []);

  const handleDelete = (topicId : number) =>{
    const updatedTopics = recentlyDeleted.filter(topic => topic.id !== topicId);
    setRecentlyDeleted(updatedTopics);

  }

  return (
    <div>
      {recentlyDeleted.map((topic) => (
        <TopicCard
          customKey={topic.id}
          title={topic.title}
          description={topic.description}
          onDelete={() => handleDelete(topic.id)}
        />
      ))}
    </div>
  );
}

export default DeletedTopicList;