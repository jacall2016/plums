'use client'

import React from 'react';
import TopicCard from './TopicCard';  // Import the individual card component
import topicsData from '../../data/topics.json';
// import editTopicButton from './editTopicButton.jsx'
// import deleteTopicButton from './deleteTopicButton.jsx'

const TopicCardList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-4 mr-4">
      {topicsData.map((topic) => (
        <TopicCard
          key={topic.id}
          customKey={topic.id}
          title={topic.title}
          description={topic.description}
        />
      ))}
      <div className='flex justify-evenly'>

      </div>
    </div>
  );
};

export default TopicCardList;