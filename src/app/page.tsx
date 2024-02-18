import Image from "next/image";

export default function Home() {
  return (
      <main className="mb-10 h-auto">
          <h1 className="text-center text-white text-4xl mt-32 md:text-6xl">PLuMS</h1>
          <div className="flex items-center mt-4">
              <div className="hidden md:flex bg-gray-900 bg-opacity-50 rounded-xl text-white w-3/5 ml-10 h-56">
                  <h2 className="text-4xl text-center mx-auto my-auto w-3/5">Your Personal Learning Management System </h2>
              </div>
              <div className="mx-auto lg:ml-10 tree">
                  <img className="w-auto h-96" src="/images/tree.png" alt="plum tree" />
              </div>
          </div>
      </main>
  );
}
