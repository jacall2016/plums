'use client';
// MockData.tsx
export interface Source {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    url?: string;
    note?: string;
  }
  
  export const mockSources: Source[] = [
    {
      id: '1',
      title: 'Sample Source 1',
      description: 'This is a description for Sample Source 1.',
      imageUrl: 'https://via.placeholder.com/150', // Example image URL
      url: 'https://example.com/source1', // Example URL
      note: 'This is a note for Sample Source 1.',
    },
    {
      id: '2',
      title: 'Sample Source 2',
      description: 'This is a description for Sample Source 2.',
      imageUrl: 'https://via.placeholder.com/150', // Example image URL
      url: 'https://example.com/source2', // Example URL
      // No note for Sample Source 2
    },
    {
      id: '3',
      title: 'Sample Source 3',
      description: 'This is a description for Sample Source 3.',
      // No image for Sample Source 3
      url: 'https://example.com/source3', // Example URL
      note: 'This is a note for Sample Source 3.',
    },
  ];
  