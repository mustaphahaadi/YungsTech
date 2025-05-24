import React from 'react';

const Tutorials: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tutorials</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tutorial Categories */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Web Development</h2>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              HTML & CSS Fundamentals
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              JavaScript Essentials
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              React Framework
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Backend Development</h2>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Python Programming
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Node.js & Express
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Database Design
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Mobile Development</h2>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              React Native
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Flutter
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              iOS Development
            </li>
          </ul>
        </div>
      </div>

      {/* Featured Tutorial */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Featured Tutorial</h2>
        <h3 className="text-xl mb-2">Building Modern Web Applications with React</h3>
        <p className="mb-4 text-blue-100">Learn how to build scalable and performant web applications using React and modern development tools.</p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
          Start Learning
        </button>
      </div>
    </div>
  );
};

export default Tutorials;
