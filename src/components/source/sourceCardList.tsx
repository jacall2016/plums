'use client'
import React, { useEffect, useState } from 'react';
import { Sources } from '@prisma/client';
import SourceCard from './sourceCard';

interface Props {
  customKey: string;
}

const SourceList: React.FC<Props> = ({ customKey }) => {
  const [sources, setSources] = useState<Sources[]>([]);

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

  useEffect(() => {
    fetchData();
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

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-center align-middle">
      {sources.map((source) => (
        <SourceCard
          key={source.id}
          source={source} // Pass the entire source object
          onDelete={() => handleDelete(source.id)}
        />
      ))}
    </div>
  );
};

export default SourceList;
