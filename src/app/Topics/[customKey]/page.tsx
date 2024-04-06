'use client'

import React, { useState, useEffect } from 'react';
import SourceList from '@/components/source/sourceCardList';
import AddSourceButton from '@/components/source/addSourceButton';
import AddTopicButton from '@/components/topic/addTopicButton';

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
      <div className="items-center w-fit">
        <h1 className="text-white text-center text-5xl">{Title}</h1>
        <div className="items-center p-4">
          <div className="p-4 text-right">
            <AddSourceButton customKey={params.customKey} onMouseEnter={function (): void {
              throw new Error('Function not implemented.');
            } } onMouseLeave={function (): void {
              throw new Error('Function not implemented.');
            } } />
            {/* <AddTopicButton parentId={params.customKey}/> */}
          </div>
        </div>
        <div className="items-center mx-16">
          <SourceList customKey={params.customKey} />
        </div>
      </div>
    </main>
  );
};

export default Topic;
