import React from 'react';
import { LearningPath, LearningPreferences } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { BookOpen, Star, Zap, BarChart } from 'lucide-react';
import { getIconComponent } from '../../data/mockData';

interface PersonalizedPathCardProps {
  path: LearningPath;
  userPreferences: LearningPreferences;
  onClick: (pathId: string) => void;
  matchScore: number;
}

const PersonalizedPathCard: React.FC<PersonalizedPathCardProps> = ({
  path,
  userPreferences,
  onClick,
  matchScore
}) => {
  const IconComponent = getIconComponent(path.icon);
  
  const getMatchScoreColor = () => {
    if (matchScore >= 90) return 'text-emerald-500';
    if (matchScore >= 70) return 'text-blue-500';
    return 'text-gray-500';
  };

  const getDifficultyBadge = () => {
    const adjustedDifficulty = path.adaptiveDifficulty || 1;
    if (adjustedDifficulty > 1.2) return <Badge variant="danger">Challenging</Badge>;
    if (adjustedDifficulty < 0.8) return <Badge variant="success">Easier</Badge>;
    return <Badge variant="warning">Standard</Badge>;
  };

  return (
    <Card 
      className="relative overflow-hidden transition-all duration-300 hover:shadow-lg"
      onClick={() => onClick(path.id)}
      hover
    >
      {/* Match Score Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Star className={`h-5 w-5 ${getMatchScoreColor()}`} />
        <span className={`font-bold ${getMatchScoreColor()}`}>{matchScore}% Match</span>
      </div>

      <div className="flex items-start gap-4">
        <div className={`p-4 rounded-xl text-white bg-gradient-to-br ${
          path.level === 'beginner' ? 'from-emerald-400 to-emerald-600' : 
          path.level === 'intermediate' ? 'from-amber-400 to-amber-600' : 
          'from-rose-400 to-rose-600'
        }`}>
          <IconComponent className="h-8 w-8" />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800 pr-24">{path.title}</h3>
          <p className="text-gray-600 mt-1">{path.description}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {getDifficultyBadge()}
            <Badge variant="info">Ages {path.ageRange}</Badge>
            <Badge variant="secondary">
              {path.modules.length} Modules
            </Badge>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Adapted to your {userPreferences.learningSpeed} learning pace</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <span>Focuses on your preferred {userPreferences.preferredLearningStyle} learning style</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BarChart className="h-4 w-4 text-emerald-500" />
              <span>Difficulty adjusted to your progress</span>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button 
              variant="primary"
              size="sm"
              icon={<BookOpen className="h-4 w-4" />}
            >
              Start Learning
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PersonalizedPathCard;