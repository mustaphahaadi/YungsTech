import React, { useState } from 'react';
import { mockLearningPaths } from '../data/mockData';
import LearningPathCard from '../components/learning/LearningPathCard';
import { BookOpen, Filter, Search } from 'lucide-react';
import PathDetails from '../components/learning/PathDetails';
import CodeExercise from '../components/exercises/CodeExercise';
import { mockExercises } from '../data/mockData';

const LearningPaths: React.FC = () => {
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  
  const selectedPath = selectedPathId 
    ? mockLearningPaths.find(path => path.id === selectedPathId) 
    : null;
  
  const handlePathClick = (pathId: string) => {
    setSelectedPathId(pathId);
    setSelectedLessonId(null);
  };
  
  const handleStartLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
  };

  const handleLessonComplete = () => {
    // In a real app, we would update user progress
    // For demo, we'll just go back to the path details
    setSelectedLessonId(null);
  };
  
  const filteredPaths = mockLearningPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          path.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || path.level === filterLevel;
    
    return matchesSearch && matchesLevel;
  });

  // Show lesson/exercise if one is selected
  if (selectedLessonId) {
    // In a real app, we'd fetch the actual exercise
    // For demo, we'll just show the first exercise
    return (
      <div className="mx-auto max-w-4xl">
        <CodeExercise 
          exercise={mockExercises[0]} 
          onComplete={handleLessonComplete} 
        />
      </div>
    );
  }
  
  // Show path details if a path is selected
  if (selectedPath) {
    return (
      <PathDetails 
        path={selectedPath}
        onBack={() => setSelectedPathId(null)}
        onStartLesson={handleStartLesson}
      />
    );
  }

  // Otherwise show all paths
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <BookOpen className="mr-2 h-6 w-6 text-indigo-500" />
          Learning Paths
        </h2>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search learning paths..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          <select
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value as any)}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
      
      {/* Path Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPaths.map(path => (
          <LearningPathCard
            key={path.id}
            path={path}
            onClick={handlePathClick}
          />
        ))}
      </div>
      
      {filteredPaths.length === 0 && (
        <div className="text-center py-10">
          <div className="text-gray-400 text-lg">No learning paths match your search</div>
          <button 
            className="mt-4 text-indigo-500 font-medium hover:underline"
            onClick={() => {
              setSearchTerm('');
              setFilterLevel('all');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default LearningPaths;