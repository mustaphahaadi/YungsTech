import React from 'react';
import { Achievement } from '../../lib/api';
import { Award, Lock } from 'lucide-react';
import Card from '../ui/Card';

interface AchievementCardProps {
  achievement: Achievement;
  unlocked: boolean;
  unlockedAt: string | null;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ 
  achievement, 
  unlocked, 
  unlockedAt 
}) => {
  // Format the unlock date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Map icon string to actual icon component
  const renderIcon = () => {
    switch (achievement.icon) {
      case 'award':
        return <Award className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  return (
    <Card className={unlocked ? 'border-green-200' : 'opacity-75'}>
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-lg mr-3 ${
          unlocked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
        }`}>
          {renderIcon()}
        </div>
        <h3 className={`text-xl font-semibold ${
          unlocked ? 'text-gray-800' : 'text-gray-500'
        }`}>
          {achievement.title}
        </h3>
      </div>
      
      <p className={`mb-4 ${unlocked ? 'text-gray-600' : 'text-gray-500'}`}>
        {achievement.description}
      </p>
      
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          unlocked 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {unlocked ? 'Unlocked' : 'Locked'}
        </span>
        
        <span className="text-sm text-gray-500">
          {unlocked 
            ? `Unlocked on ${formatDate(unlockedAt!)}` 
            : `+${achievement.xp_reward} XP`
          }
        </span>
      </div>
      
      {!unlocked && (
        <div className="absolute top-0 right-0 m-4">
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
      )}
    </Card>
  );
};

export default AchievementCard;