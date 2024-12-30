import dynamic from "next/dynamic";
import React from "react";

const Scene = dynamic(() => import("@/app/components/Scene"), { ssr: false });
const Home = () => {
  return (
    <main className="h-screen w-screen py-4 bg-black overflow-hidden">
      <h1
        className="text-4xl font-bold text-center text-transparent 
bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text  
                   animate-bounce hover:animate-pulse cursor-pointer  transition-all duration-300"
      >
        Scroll up and down to see robot dancing
      </h1>

      <Scene />
      <footer className="absolute bottom-0 w-full px-10 py-6 rounded-lg mt-2 bg-gray-900  text-white text-center">
        <div className="flex justify-between items-center px-4">
          <p>made with love by Muhammad Ahmad</p>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/muhammad-ahmad/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/muhammad-ahmad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
