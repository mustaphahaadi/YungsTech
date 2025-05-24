import React from 'react';
import { Calendar, Tag, User } from 'lucide-react';

const Blog: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">YungsTech Blog</h1>

      {/* Featured Post */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt="Featured blog post"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Featured</div>
            <h2 className="block mt-1 text-2xl font-bold text-gray-900">
              The Future of Web Development: 2025 and Beyond
            </h2>
            <p className="mt-2 text-gray-500">
              Explore the upcoming trends and technologies that will shape the future of web development...
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <User className="w-4 h-4 mr-1" />
              <span className="mr-4">Sarah Johnson</span>
              <Calendar className="w-4 h-4 mr-1" />
              <span>May 20, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              className="h-48 w-full object-cover"
              src={`https://images.unsplash.com/photo-${1550000000000 + i}`}
              alt="Blog post"
            />
            <div className="p-6">
              <div className="flex items-center mb-2">
                <Tag className="w-4 h-4 text-indigo-500 mr-2" />
                <span className="text-sm text-indigo-500">Technology</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Essential Developer Tools for 2025
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Discover the must-have tools and resources for modern development workflows...
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <User className="w-4 h-4 mr-1" />
                <span className="mr-4">Alex Chen</span>
                <Calendar className="w-4 h-4 mr-1" />
                <span>May 15, 2025</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-12 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
        <p className="mb-4">Get the latest articles and updates delivered to your inbox.</p>
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
