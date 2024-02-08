'use client'
import React from 'react';

//   const [topics, setTopics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('@/data/topics.json');
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const data = await response.json();
//         setTopics(data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }
/*
import React from 'react';

const TopicCard = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white border rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default TopicCard;
*/

import EditTopicButton from './editTopicButton';
import DeleteTopicButton from './deleteTopicButton';

function TopicCard({ title, onEdit, onDelete }) {
  return (
    <a href="">
      <div>
        <h2>{title}</h2>
        {/* Display other content related to the Topic file */}
        <EditTopicButton onClick={onEdit} />
        <DeleteTopicButton onClick={onDelete} />
      </div>
    </a>
  );
}

export default TopicCard;