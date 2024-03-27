import Image from "next/image";

export default function Tutorial() {
  return (
    <main className="container ml-10 mr-10 mt-40 w-4/5 md:w-11/12">
      <h1 className="text-3xl font-bold mb-4 text-white">How To Use &amp;&amp; FAQ</h1>

      <section className="mb-8 text-center md:text-left  bg-gray-900 bg-opacity-50 p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">1. What is the Personal Learning Management System?</h2>
        <p className="text-white">
          The Personal Learning Management System is a platform designed to help you manage your learning materials.
          You can create topics, add and organize sources (images, URLs, notes), create categories, and more.
        </p>
      </section>

      <section className="mb-8 text-center md:text-right  bg-gray-900 bg-opacity-50 p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">2. How do I create a new topic?</h2>
        <p className="text-white"> 
          To create a new topic, navigate to the &quot;Topics&quot; section and click on the &quot;Add Topic&quot; button.
          Fill in the required information and save your new topic.
        </p>
      </section>

      <section className="mb-8 text-center md:text-left  bg-gray-900 bg-opacity-50 p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">3. Can I organize topics into categories?</h2>
        <p className="text-white">
          Yes, you can organize topics into categories. Go to the &quot;Categories&quot; section, click on &quot;Add Category,&quot;
          and assign topics to the desired category during the topic creation or editing process.
        </p>
      </section>

      <section className="mb-8 text-center md:text-right  bg-gray-900 bg-opacity-50 p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">4. How do I add sources to a topic?</h2>
        <p className="text-white">
          To add sources to a topic, open the topic details, and there will be an option to manage sources.
          You can add images, URLs, notes, and more to enhance your learning experience for each topic.
        </p>
      </section>

      <section className="mb-8 text-center md:text-left  bg-gray-900 bg-opacity-50 p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">5. Can I edit or delete a category?</h2>
        <p className="text-white">
          Yes, you can edit or delete a category. Navigate to the &quot;Categories&quot; section, find the category you want
          to modify, and use the provided options for editing or deleting.
        </p>
      </section>

      <section className="mb-8 text-center md:text-right  bg-gray-900 bg-opacity-50 p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">6. How can I manage sources within a topic?</h2>
        <p className="text-white">
          Inside the topic details, you&apos;ll find a section dedicated to managing sources.
          You can add, edit, or delete sources such as images, URLs, and notes for that specific topic.
        </p>
      </section>

    </main>
  );
}
