import React from 'react';
import { Award, Clock, Book } from 'lucide-react';

const Certifications: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Professional Certifications</h1>
      
      {/* Certification Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-blue-600 p-4 text-white">
            <h2 className="text-xl font-bold">Full-Stack Developer</h2>
            <p className="text-blue-100">Master both frontend and backend</p>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-600">6 months</span>
            </div>
            <div className="flex items-center mb-4">
              <Book className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-600">12 modules</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start Track
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-green-600 p-4 text-white">
            <h2 className="text-xl font-bold">Data Science</h2>
            <p className="text-green-100">Become a data expert</p>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-600">8 months</span>
            </div>
            <div className="flex items-center mb-4">
              <Book className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-600">15 modules</span>
            </div>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Start Track
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-purple-600 p-4 text-white">
            <h2 className="text-xl font-bold">Cloud Architecture</h2>
            <p className="text-purple-100">Build scalable cloud solutions</p>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-600">7 months</span>
            </div>
            <div className="flex items-center mb-4">
              <Book className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-600">14 modules</span>
            </div>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Start Track
            </button>
          </div>
        </div>
      </div>

      {/* Industry Recognition */}
      <div className="bg-gray-50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Industry Recognition</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <Award className="w-12 h-12 text-blue-600 mr-4" />
            <div>
              <h3 className="font-bold text-gray-900">ISO Certified</h3>
              <p className="text-gray-600">Internationally recognized</p>
            </div>
          </div>
          <div className="flex items-center">
            <Award className="w-12 h-12 text-green-600 mr-4" />
            <div>
              <h3 className="font-bold text-gray-900">Industry Partners</h3>
              <p className="text-gray-600">Top tech companies</p>
            </div>
          </div>
          <div className="flex items-center">
            <Award className="w-12 h-12 text-purple-600 mr-4" />
            <div>
              <h3 className="font-bold text-gray-900">Job Guarantee</h3>
              <p className="text-gray-600">Career support included</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
