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
    <main>
      <div id="categoryDropdown">
        <h1>Your Page</h1>
        {/* <CategoryDropdown onSelect={handleCategorySelect} /> */}
        {/* Add other content based on the selected category */}
      </div>

      <div id="topics">
        <TopicCardList/>
      </div>
    </main>
  );
}

