'use client'

import React from 'react';
import TopicCard from 'topicCard';  // Import the individual card component
import topicsData from '../../data/topics.json';

const TopicCardList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {topicsData.map((topic) => (
        <TopicCard
          key={topic.id}
          title={topic.title}
          description={topic.description}
          imageUrl={topic.imageUrl}
        />
      ))}
    </div>
  );
};

export default TopicCardList;