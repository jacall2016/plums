import Image from "next/image";
import React from 'react';
import SourceList from '@/components/source/sourceCardList'



export default function Topic({ params }: { params: { customKey: string } }) {

  
  return (
    <main className="mt-32">
      <h1 className="text-black text-center text-4xl">Topic Card: {params.customKey}</h1>
      <SourceList
      customKey={params.customKey}/>
    </main>
  );
}

