import React, { useState, useEffect } from 'react';
import { LearningPath, api, apiRequest } from '../../lib/api';
import { ArrowLeft, BookOpen, CheckCircle, Clock, Star } from 'lucide-react';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';

interface PathDetailsProps {
  path: LearningPath;
  onBack: () => void;
}

interface PathProgress {
  total_lessons: number;
  completed_lessons: number;
  completion_percentage: number;
}

const PathDetails: React.FC<PathDetailsProps> = ({ path, onBack }) => {
  const [progress, setProgress] = useState<PathProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const progressData = await apiRequest(() => 
          api.learning.getPathProgress(path.id)
        );
        setProgress(progressData);
      } catch (error) {
        console.error('Failed to load path progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [path.id]);

  // Map icon string to actual icon component
  const renderIcon = () => {
    switch (path.icon) {
      case 'book':
        return <BookOpen className="w-8 h-8 text-indigo-500" />;
      default:
        return <BookOpen className="w-8 h-8 text-indigo-500" />;
    }
  };

  return (
    <div>
      <button 
        onClick={onBack}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Learning Paths
      </button>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-start">
          <div className="p-3 bg-indigo-100 rounded-lg mr-4">
            {renderIcon()}
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{path.title}</h1>
            <p className="text-gray-600 mt-1">{path.description}</p>
            
            <div className="flex items-center mt-4 space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <Star className="w-4 h-4 mr-1" />
                <span>{path.level.charAt(0).toUpperCase() + path.level.slice(1)}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  {path.modules.reduce((total, module) => 
                    total + module.lessons.reduce((t, lesson) => t + lesson.duration, 0), 0)} min
                </span>
              </div>
            </div>
          </div>
        </div>

        {!loading && progress && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Your progress</span>
              <span className="text-sm text-gray-500">
                {progress.completed_lessons}/{progress.total_lessons} lessons
              </span>
            </div>
            <ProgressBar progress={progress.completion_percentage} />
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Modules</h2>
        
        <div className="space-y-6">
          {path.modules.map((module, index) => (
            <div key={module.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
              <button
                onClick={() => setActiveModuleIndex(index)}
                className="w-full text-left"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {module.order}. {module.title}
                  </h3>
                  <div className="text-sm text-gray-500">
                    {module.lessons.length} lessons
                  </div>
                </div>
                <p className="text-gray-600 mt-1">{module.description}</p>
              </button>
              
              {activeModuleIndex === index && (
                <div className="mt-4 pl-4 border-l-2 border-indigo-200">
                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="mr-3">
                          {/* This would be replaced with actual completion status */}
                          <div className="w-5 h-5 rounded-full border border-gray-300"></div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{lesson.title}</h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{lesson.duration} min</span>
                            <span className="mx-2">•</span>
                            <span>{lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle starting the lesson
                          console.log(`Start lesson: ${lesson.id}`);
                        }}
                      >
                        Start
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PathDetails;