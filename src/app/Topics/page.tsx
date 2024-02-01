import Image from "next/image";
import TopicCard from '../../components/topicCard';
import React from 'react';
import CategoryDropdown from '../../components/CategoryDropdown';


export default function Topics() {
  const handleCategorySelect = (categoryId : number) => {
    // Handle the selected category, e.g., filter content based on the category
    console.log('Selected category:', categoryId);
  };
  
  return (
    <main>
      <div id="categoryDropdown">
        <h1>Your Page</h1>
        {/* <CategoryDropdown onSelect={handleCategorySelect} /> */}
        {/* Add other content based on the selected category */}
      </div>

      <div id="topics">
        <TopicCard/>
      </div>
    </main>
  );
}

