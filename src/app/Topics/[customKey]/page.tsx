'use client'

import React, { useState, useEffect } from 'react';
import SourceList from '@/components/source/sourceCardList';
import AddSourceButton from '@/components/source/addSourceButton';

interface TopicProps {
  params: {
    customKey: string;
    title: string;
  };
}

const Topic: React.FC<TopicProps> = ({ params }) => {
  const [Title, setTitle] = useState<string>(''); // Initialize title state

  useEffect(() => {
    async function fetchTitle() {
      try {
        const response = await fetch(`/api/topics/topic/?topicId=${params.customKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch topics');
        }
        const data = await response.json();
        setTitle(data.data.title); // Update title state with fetched title
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    }

    fetchTitle(); // Call the fetch function
  }, [params.customKey]); // Re-run effect when customKey changes

  return (
    <main className="mt-32 mb-0 flex justify-center items-center min-h-60">
      <div className="items-centerw-fit">
        <div className="flex justify-center items-center p-4">
          <h1 className="text-white text-center text-5xl">{Title}</h1>
          <div className="p-4">
            <AddSourceButton />
          </div>
        </div>
        <div className="-mt-10 flex justify-center items-center">
          <SourceList customKey={params.customKey} />
        </div>
      </div>
    </main>
  );
};

export default Topic;
