import Image from "next/image";
import TopicCardList from '../../components/topic/topicsCardList';
import React from 'react';
import CategoryDropdown from '../../components/catagory/categoryDropdown';


export default function Topics() {
  const handleCategorySelect = (categoryId : number) => {
    // Handle the selected category, e.g., filter content based on the category
    console.log('Selected category:', categoryId);
  };
  
  return (
    <main className="mt-32 text-center">
      <h1 className="text-4xl text-white">Topics</h1>
      <div id="categoryDropdown" className="mt-4">
        <CategoryDropdown/>
      </div>

      <div id="topics" className="mt-8">
        <TopicCardList/>
      </div>
    </main>
  );
}

