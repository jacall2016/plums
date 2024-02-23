'use client'
// TopicCardList.js
import React, { useState } from 'react';
import TopicCard from './TopicCard';
import topicsData from '../../data/topics.json';
import recentlyDeletedData from '../../data/recentlyDeleted.json'

const TopicCardList = () => {

  const [topics, setTopicsData] = useState(topicsData);
  const [recentlyDeleted, setRecentlyDeleted] = useState(recentlyDeletedData);

  // Function to handle deleting a topic
  const handleDelete = (topicId) => {
    // Find the topic to delete from topicsData
    const deletedTopic = topics.find(topic => topic.id === topicId);
    
    // Filter out the deleted topic from topicsData
    const updatedTopics = topics.filter(topic => topic.id !== topicId);
    
    // Add the deleted topic to recentlyDeletedData
    setRecentlyDeleted([...recentlyDeleted, deletedTopic]);
    
    // Update the state with the updated topicsData
    setTopicsData(updatedTopics);
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-4 mr-4">
      {topics.map((topic) => (
        <div key={topic.id} className="relative rounded-2xl">
          <TopicCard
            customKey={topic.id}
            title={topic.title}
            description={topic.description}
            onDelete={() => handleDelete(topic.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default TopicCardList;
