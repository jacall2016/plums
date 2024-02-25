import Image from "next/image";
import React from 'react';
import SourceList from '@/components/source/sourceCardList'
import AddTopicButton from '@/components/topic/addTopicButton'

export default function Topic({ params }: { params: { customKey: string } }) {
  
  return (
    <main className="mt-32 mb-0 flex justify-center items-center">
      <div className="items-centerw-fit">
        <div className="flex justify-center items-center p-4">
          <h1 className="text-black text-center text-4xl">Topic Card: {params.customKey}</h1>
          <div className="p-4">
            <AddTopicButton />
          </div>
        </div>
        <div className="mt-0 flex justify-center items-center">
          <SourceList customKey={params.customKey}/>
        </div>
      </div>
    </main>
  );
}

