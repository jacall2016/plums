'use client'

import React, { useState, useEffect } from 'react';
import TopicCard from './TopicCard';
import { Topics } from '@prisma/client';

const TopicCardList = () => {
  const [topics, setTopics] = useState<Topics[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/topics');
        if (!response.ok) {
          throw new Error('Failed to fetch topics');
        }
        const data = await response.json();
        setTopics(data.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once

  // Function to handle deleting a topic
  const handleDelete = (topicId: string) => {
    // Implement delete logic here, either by calling an API or updating state directly
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
