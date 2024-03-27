'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import RecentlyDeletedTopicCard from './recentlyDeletedTopicCard'

const DeletedTopicList = () => {
  const [recentlyDeleted, setRecentlyDeleted] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/recently-deleted');
        if (!response.ok) {
          throw new Error('Failed to fetch topics');
        }
        const data = await response.json();
        setRecentlyDeleted(data.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (topicId: any) => {
    try {
      const response = await fetch(`/api/recently-deleted/?topicId=${topicId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete topic');
      }
      const data = await response.json();
      setRecentlyDeleted(data.data);
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  const handleEdit = async (topicId: any) => {
    try {
      const response = await fetch(`/api/recently-deleted/?topicId=${topicId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to update topic');
      }
      const data = await response.json();
      setRecentlyDeleted(data.data);
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  return (
    <div>
      {recentlyDeleted.map((topic) => (
        <RecentlyDeletedTopicCard
          customKey={topic.id}
          title={topic.title}
          description={topic.description}
          onEdit= {() => handleEdit(topic.id)}
          onDelete={() => handleDelete(topic.id)}
        />
      ))}
    </div>
  );
}

export default DeletedTopicList;