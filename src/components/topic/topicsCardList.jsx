'use client'
// TopicCardList.js

import React from 'react';
import TopicCard from './TopicCard';
import topicsData from '../../data/topics.json';

const TopicCardList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-4 mr-4">
      {topicsData.map((topic) => (
        <div key={topic.id} className="relative rounded-2xl">
          <TopicCard
            customKey={topic.id}
            title={topic.title}
            description={topic.description}
          />
        </div>
      ))}
    </div>
  );
};

export default TopicCardList;
