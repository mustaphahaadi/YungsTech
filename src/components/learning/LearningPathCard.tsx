import React from 'react';
import { LearningPath } from '../../types';
import { ChevronRight, Trophy } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { getIconComponent } from '../../data/mockData';

interface LearningPathCardProps {
  path: LearningPath;
  onClick: (pathId: string) => void;
  isActive?: boolean;
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({
  path,
  onClick,
  isActive = false
}) => {
  const IconComponent = getIconComponent(path.icon);
  
  // Badge color based on level
  const levelBadgeVariant = {
    'beginner': 'success',
    'intermediate': 'warning',
    'advanced': 'danger'
  }[path.level] as 'success' | 'warning' | 'danger';

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 ${
        isActive ? 'border-2 border-indigo-400 shadow-lg' : 'hover:shadow-md'
      }`}
      onClick={() => onClick(path.id)}
      hover
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-bl-3xl -z-0"></div>
      
      <div className="flex items-start gap-4 relative z-10">
        {/* Icon */}
        <div className={`p-3 rounded-xl text-white bg-gradient-to-br ${
          path.level === 'beginner' ? 'from-emerald-400 to-emerald-600' : 
          path.level === 'intermediate' ? 'from-amber-400 to-amber-600' : 
          'from-rose-400 to-rose-600'
        }`}>
          <IconComponent className="h-8 w-8" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-gray-800">{path.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{path.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-indigo-400" />
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant={levelBadgeVariant}>
              {path.level.charAt(0).toUpperCase() + path.level.slice(1)}
            </Badge>
            <Badge variant="info">
              Ages {path.ageRange}
            </Badge>
            <Badge variant="secondary">
              {path.modules.length} {path.modules.length === 1 ? 'Module' : 'Modules'}
            </Badge>
          </div>
        </div>
      </div>
      
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500"></div>
      )}
    </Card>
  );
};

export default LearningPathCard;