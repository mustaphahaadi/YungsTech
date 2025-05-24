import React from 'react';
import { MessageCircle, Users, Flame, Search } from 'lucide-react';

const Forums: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Forums</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search discussions..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <MessageCircle className="w-8 h-8 text-blue-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">General Discussion</h2>
          <p className="text-gray-600 mb-4">Discuss anything related to programming and tech.</p>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">Threads: 1.2K</span>
            <span>Posts: 5.8K</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <Users className="w-8 h-8 text-green-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Help & Support</h2>
          <p className="text-gray-600 mb-4">Get help with coding problems and technical issues.</p>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">Threads: 856</span>
            <span>Posts: 3.2K</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <Flame className="w-8 h-8 text-orange-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Show & Tell</h2>
          <p className="text-gray-600 mb-4">Share your projects and get feedback.</p>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">Threads: 645</span>
            <span>Posts: 2.1K</span>
          </div>
        </div>
      </div>

      {/* Recent Discussions */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Discussions</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-blue-600">How to optimize React performance?</h3>
                <span className="text-sm text-gray-500">2h ago</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                I'm working on a large React application and noticed some performance issues...
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-4">Replies: 12</span>
                <span className="mr-4">Views: 234</span>
                <span>by John Doe</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forums;
