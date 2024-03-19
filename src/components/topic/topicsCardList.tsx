'use client'
import React, { useState, useEffect } from 'react';
import TopicCard from './topicCard';
import EditTopicForm from './editTopicForm';
import Image from 'next/image';
import CategoryDropdown from '../catagory/categoryDropdown';
import { Topics, CategoryToTopic } from '@prisma/client';

const TopicCardList = () => {
  const [topics, setTopics] = useState<Topics[]>([]);
  const [categories, setTopicCategories] = useState<CategoryToTopic[]>([]);
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
  }, []);

  const handleDelete = async (topicId: string) => {
    try {
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
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  const handleEdit = async (topicId: string) => {
    try {
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
      setEditTopic(data.data);
      setTopicCategories(data.Categories);
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
        body: JSON.stringify(editedTopic),
      });
      if (!response.ok) {
        throw new Error('Failed to update topic');
      }
      const data = await response.json();
      setTopics(data.data);
      setEditTopic(null);
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  const handleCloseEditForm = () => {
    setEditTopic(null);
  };

  const clearFilter = async () => {
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
  };

  const handleFilter = async (categoryId: any) => {
    try {
      const response = await fetch(`/api/topics/category/?categoryId=${categoryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch topic for editing');
      }
      const data = await response.json();
      setTopics(data.data);
    } catch (error) {
      console.error('Error fetching topic for editing:', error);
    }
  };

  

  return (
    <div className='w-4/5 overflow-hidden'>
      <div className="flex items-center mb-10 w-full">
        <div className="flex flex-row items-center">
          <div id="categoryDropdown" className="mr-4">
            <CategoryDropdown onSelectCategory={handleFilter} filterClear={clearFilter} />
          </div>
        </div>
      </div>
      <div id="topics" className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-4 mr-4">
        {topics.map((topic : Topics) => (
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
              onClick={handleCloseEditForm}
              src="/images/x-icon.svg"
              alt="exit icon"
              width={40}
              height={40}
            />
            <EditTopicForm topic={editTopic} topicCategories={categories} onSubmit={handleEditSubmit} />
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default TopicCardList;
