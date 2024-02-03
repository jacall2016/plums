// Filter made to filter through different types of sources
'use client'
import React, { useState } from 'react';

function TopicFilter({ onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search topics..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default TopicFilter;
