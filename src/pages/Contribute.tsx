import React from 'react';
import { Github, Code, Users, Star } from 'lucide-react';

const Contribute: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contribute to YungsTech</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Help us make coding education more accessible and enjoyable for everyone.
        </p>
      </div>

      {/* Ways to Contribute */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Code className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Code Contribution</h2>
          <p className="text-gray-600 mb-4">
            Contribute to our open-source projects and help improve our platform.
          </p>
          <a
            href="https://github.com/yungstech"
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
          >
            <Github className="w-4 h-4 mr-2" />
            View GitHub Repository
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Community Support</h2>
          <p className="text-gray-600 mb-4">
            Help other learners by answering questions and sharing your knowledge.
          </p>
          <a
            href="/community"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Join Our Community
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Content Creation</h2>
          <p className="text-gray-600 mb-4">
            Create tutorials, challenges, and learning materials for our platform.
          </p>
          <button className="text-purple-600 hover:text-purple-700 font-medium">
            Become a Creator
          </button>
        </div>
      </div>

      {/* Contributor Guidelines */}
      <div className="bg-gray-50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contributor Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Code Contributions</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Fork the repository</li>
              <li>Create a feature branch</li>
              <li>Follow our coding standards</li>
              <li>Submit a pull request</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Content Guidelines</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Use clear and concise language</li>
              <li>Include practical examples</li>
              <li>Follow our content structure</li>
              <li>Maintain accuracy and relevance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h2>
        <p className="mb-6 text-blue-100">
          Join our growing community of contributors and help shape the future of coding education.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Contribute;
