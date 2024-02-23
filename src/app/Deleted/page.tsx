
import Image from 'next/image';
import DeletedTopicList from '../../components/topic/deletedTopicList';


export default function Deleted() {



  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <DeletedTopicList/>
    </main>
  );
}
