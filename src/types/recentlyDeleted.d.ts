type Topic = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  };
  
  declare module '*.json' {
    const value: Topic[];
    export default value;
  }