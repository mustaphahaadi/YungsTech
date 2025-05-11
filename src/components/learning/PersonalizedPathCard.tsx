import React from 'react';
import { LearningPath } from '../../lib/api';
import { ArrowRight, BookOpen, Code, Zap } from 'lucide-react';

interface PersonalizedPathCardProps {
  path: LearningPath;
  onClick: () => void;
}

const PersonalizedPathCard: React.FC<PersonalizedPathCardProps> = ({ path, onClick }) => {
  // Map icon string to actual icon component
  const renderIcon = () => {
    switch (path.icon) {
      case 'book':
        return <BookOpen className="w-5 h-5 text-indigo-500" />;
      case 'code':
        return <Code className="w-5 h-5 text-indigo-500" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-indigo-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div 
      onClick={onClick}
      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="p-2 bg-indigo-100 rounded-lg mr-3">
        {renderIcon()}
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{path.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{path.description}</p>
      </div>
      
      <ArrowRight className="w-4 h-4 text-gray-400" />
    </div>
  );
};

export default PersonalizedPathCard;