'use client'
import React, { useState, useEffect } from 'react';
import TopicCard from './topicCard';
import { Topics, CategoryToTopic } from '@prisma/client';
import EditTopicForm from './editTopicForm';
import Image from 'next/image';

const TopicCardList = () => {
  const [topics, setTopics] = useState<Topics[]>([]);
  const [categories, setTopicCategories] = useState<CategoryToTopic[]>([])
  const [editTopic, setEditTopic] = useState<Topics | null>(null);

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
  const handleDelete = async (topicId: string) => {
    try {
      console.log(topicId)
      const response = await fetch(`/api/topics/?topicId=${topicId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete topic');
      }
      const data = await response.json();
      setTopics(data.data);
      // Assuming successful deletion, update the topics state or refetch data
      // Example: refetch data
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  const handleEdit = async (topicId: string) => {
    try {
      // Fetch topic data for editing
      const response = await fetch(`/api/topics/topic/?topicId=${topicId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch topic for editing');
      }
      const data = await response.json();
      // const categoriesData = await response.json()
      
      setEditTopic(data.data);
      setTopicCategories(data.Categories)

    } catch (error) {
      console.error('Error fetching topic for editing:', error);
    }
  };

  const handleEditSubmit = async (editedTopic: any) => {
      try {
        const response = await fetch(`/api/topics/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedTopic)
        });
        if (!response.ok) {
          throw new Error('Failed to delete topic');
        }
        const data = await response.json();
        setTopics(data.data);
        setEditTopic(null);
        // Assuming successful deletion, update the topics state or refetch data
        // Example: refetch data
      } catch (error) {
        console.error('Error deleting topic:', error);
  };
  }

  const handleCloseEditForm = () => {
    setEditTopic(null);
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
            onEdit={() => handleEdit(topic.id)}
          />
        </div>
      ))}

      {editTopic && (
        <div className='text-black absolute right-20 top-40 z-10 w-80 bg-white p-4 rounded-md shadow-md'>
          <Image
            className="absolute left-64"
            onClick={handleCloseEditForm} // Close the edit form
            src="/images/x-icon.svg"
            alt="exit icon"
            width={40}
            height={40}
          />
          <EditTopicForm topic={editTopic} topicCategories={categories} onSubmit={handleEditSubmit} />
        </div>
      )}
    </div>
  );
}

export default TopicCardList;
