'use client'

import React, { useEffect, useState } from 'react';
import SourceCard from './sourceCard';
import { mockSources } from '@/data/sourceMockData';

interface Source {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
  note?: string;
}

interface Props {
  customKey: string;
}

const SourceList: React.FC<Props> = ({ customKey }) => {
//   const [sources, setSources] = useState<Source[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`API_ENDPOINT/${customKey}`);
//         const data: Source[] = await response.json();
//         setSources(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [customKey]);

  const [sources, setSources] = useState<Source[]>(mockSources);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-center align-middle">
      {sources.map((source) => (
        <SourceCard
          key={source.id}
          title={source.title}
          description={source.description}
          imageUrl={source.imageUrl}
          url={source.url}
          note={source.note}
        />
      ))}
    </div>
  );
};

export default SourceList;
