import React from 'react';
import { LearningPath } from '../../lib/api';
import { BookOpen, Code, Zap } from 'lucide-react';
import Card from '../ui/Card';

interface LearningPathCardProps {
  path: LearningPath;
  onClick: () => void;
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({ path, onClick }) => {
  // Map icon string to actual icon component
  const renderIcon = () => {
    switch (path.icon) {
      case 'book':
        return <BookOpen className="w-6 h-6 text-indigo-500" />;
      case 'code':
        return <Code className="w-6 h-6 text-indigo-500" />;
      case 'zap':
        return <Zap className="w-6 h-6 text-indigo-500" />;
      default:
        return <BookOpen className="w-6 h-6 text-indigo-500" />;
    }
  };

  // Map level to color
  const getLevelColor = () => {
    switch (path.level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-indigo-100 rounded-lg mr-3">
          {renderIcon()}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{path.title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{path.description}</p>
      
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor()}`}>
          {path.level.charAt(0).toUpperCase() + path.level.slice(1)}
        </span>
        
        <span className="text-sm text-gray-500">
          {path.age_range}
        </span>
      </div>
    </Card>
  );
};

export default LearningPathCard;