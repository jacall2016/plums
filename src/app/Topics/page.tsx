import Image from "next/image";
import TopicCardList from '../../components/topic/topicsCardList';
import React from 'react';
import CategoryDropdown from '../../components/catagory/categoryDropdown';
import AddTopicButton from '../../components/topic/addTopicButton'

export default function Topics() {
  const handleCategorySelect = (categoryId: number) => {
    // Handle the selected category, e.g., filter content based on the category
    console.log('Selected category:', categoryId);
  };
  
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl text-white mb-4">Topics</h1>
      <div className="flex">
        <div id="categoryDropdown" className="mr-4">
          <CategoryDropdown />
        </div>
        <div>
          <AddTopicButton />
        </div>
      </div>

      <div id="topics" className="mt-8">
        <TopicCardList />
      </div>
    </main>
  );
}
