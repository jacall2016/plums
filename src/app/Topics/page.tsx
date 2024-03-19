import Image from "next/image";
import TopicCardList from '../../components/topic/topicsCardList';
import React from 'react';
import CategoryDropdown from '../../components/catagory/categoryDropdown';
import AddTopicButton from '../../components/topic/addTopicButton';
import AddCategoryButton from '../../components/catagory/addCategoryButton'


export default function Topics() {
  const handleCategorySelect = (categoryId: number) => {
    // Handle the selected category, e.g., filter content based on the category
    console.log('Selected category:', categoryId);
  };

  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen h-auto top-20">
      <div className="flex flex-col md:flex-row justify-between absolute top-28 right-1/4 -mr-40 md:-mr-32 w-64 h-auto">
        <div className="flex flex-col h-full text-white text-center mx-auto justify-evenly items-center">
          <h4 className="ml-2">Add Topic</h4>
          <AddTopicButton/>
        </div>
        <div className="flex flex-col h-full text-white text-center mx-auto justify-evenly items-center">
          <h4 className="ml-2">Add Category</h4>
          <AddCategoryButton/>
        </div>
      </div>
      <h1 className="text-4xl text-white mb-4 mt-36 md:mt-28 lg:mt-36">Topics</h1>
      {/* <div className="flex items-center">

        <div className="flex flex-row items-center">
          <div id="categoryDropdown" className="mr-4">
            <CategoryDropdown />
          </div>
        </div>
        
      </div> */}
        <TopicCardList />
    </main>
  );
}