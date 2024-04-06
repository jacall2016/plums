'use client'

import React, { useEffect, useState } from 'react';
import { Sources, Topics, CategoryToTopic } from '@prisma/client';
import SourceCard from './sourceCard';
import TopicCard from '../topic/topicCard';
import Image from 'next/image';
import EditTopicForm from '../topic/editTopicForm';

interface Props {
  customKey: string;
}

const SourceList: React.FC<Props> = ({ customKey }) => {
  const [sources, setSources] = useState<Sources[]>([]);
  const [childTopics, setChildTopics] = useState<Topics[]>([]);
  const [categories, setTopicCategories] = useState<CategoryToTopic[]>([]);
  const [editTopic, setEditTopic] = useState<Topics | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/sources/?topicId=${customKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch sources');
      }
      const data = await response.json();
      setSources(data.data);
    } catch (error) {
      console.error('Error fetching sources:', error);
    }
  };

  const getChildTopics = async () => {
    try {
      const response = await fetch(`/api/sources/topics/?topicId=${customKey}`);
      if (!response.ok) {
        throw new Error('Failed to retrieve child topics source');
      }
      const data = await response.json();
      setChildTopics(data.data);
    } catch (error) {
      console.error('Error fetching child topics:', error);
    }
  };

  useEffect(() => {
    const fetchDataAndChildTopics = async () => {
      try {
        await Promise.all([fetchData(), getChildTopics()]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAndChildTopics(); // Call the combined function on component load
  }, [customKey]);

  const handleDelete = async (sourceId: string) => {
    try {
      const response = await fetch(`/api/sources/?sourceId=${sourceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete source');
      }
      fetchData(); // Refetch data after successful deletion
    } catch (error) {
      console.error('Error deleting source:', error);
    }
  };

  const handleEdit = async (sourceId: string) => {
    try {
      const response = await fetch(`/api/sources/?sourceId=${sourceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch source for editing');
      }
      const data = await response.json();
    } catch (error) {
      console.error('Error fetching source for editing:', error);
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    try {
      const response = await fetch(`/api/sources/topics/?topicId=${topicId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete topic');
      }
      const data = await response.json();
      setChildTopics(data.data);
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  const handleEditTopic = async (topicId: string) => {
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


  const handleEditTopicSubmit = async (editedTopic: any) => {
    try {
      const response = await fetch(`/api/sources/topics/`, {
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
      setChildTopics(data.data);
      setEditTopic(null);
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  const handleCloseEditForm = () => {
    setEditTopic(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {childTopics.map((topic : Topics) => (
        <div key={topic.id} className="relative rounded-2xl">
          <TopicCard
            customKey={topic.id}
            title={topic.title}
            description={topic.description}
            onDelete={() => handleDeleteTopic(topic.id)}
            onEdit={() => handleEditTopic(topic.id)}
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
            <EditTopicForm topic={editTopic} topicCategories={categories} onSubmit={handleEditTopicSubmit} />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-center align-middle">
        {sources.map((source) => (
          <SourceCard
            key={source.id}
            source={source} // Pass the entire source object
            onDelete={() => handleDelete(source.id)}
            onEdit={() => handleEdit(source.id)}/>
        ))}
      </div>
    </div>
  );
};

export default SourceList;
