import React, { useState, useEffect } from 'react';
import { api, apiRequest, LearningPath } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import LearningPathCard from '../components/learning/LearningPathCard';
import PathDetails from '../components/learning/PathDetails';

const LearningPaths: React.FC = () => {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const pathsData = await apiRequest(() => api.learning.getPaths());
        setPaths(pathsData);
      } catch (err: any) {
        setError(err.message || 'Failed to load learning paths');
      } finally {
        setLoading(false);
      }
    };

    fetchPaths();
  }, []);

  const handleSelectPath = (path: LearningPath) => {
    setSelectedPath(path);
  };

  const handleBackToList = () => {
    setSelectedPath(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-sm font-medium text-rose-800 hover:text-rose-900"
        >
          Try again
        </button>
      </div>
    );
  }

  if (selectedPath) {
    return <PathDetails path={selectedPath} onBack={handleBackToList} />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Learning Paths</h1>
        <p className="text-gray-600 mt-2">
          Choose a learning path that matches your interests and skill level
        </p>
      </div>

      {paths.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md">
          <p>No learning paths available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path) => (
            <LearningPathCard 
              key={path.id} 
              path={path} 
              onClick={() => handleSelectPath(path)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPaths;