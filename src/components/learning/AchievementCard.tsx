import React from 'react';
import { Achievement } from '../../types';
import Card from '../ui/Card';
import { getIconComponent } from '../../data/mockData';
import { Lock } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const isUnlocked = !!achievement.unlockedAt;
  const IconComponent = getIconComponent(achievement.icon);
  
  return (
    <Card className={`text-center transition-all duration-300 ${
      isUnlocked ? 'bg-white' : 'bg-gray-50'
    }`} hover={isUnlocked}>
      <div className="relative mx-auto mb-4">
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
          isUnlocked 
            ? 'bg-gradient-to-br from-indigo-400 to-purple-500 text-white' 
            : 'bg-gray-200 text-gray-400'
        }`}>
          <IconComponent className="h-8 w-8" />
        </div>
        
        {!isUnlocked && (
          <div className="absolute -right-1 -bottom-1 bg-gray-300 rounded-full p-1">
            <Lock className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      
      <h3 className={`font-bold text-lg mb-2 ${
        isUnlocked ? 'text-gray-800' : 'text-gray-500'
      }`}>{achievement.title}</h3>
      
      <p className={`text-sm ${
        isUnlocked ? 'text-gray-600' : 'text-gray-500'
      }`}>{achievement.description}</p>
      
      {isUnlocked && (
        <div className="mt-3 text-xs text-indigo-600 font-medium">
          Unlocked on {achievement.unlockedAt?.toLocaleDateString()}
        </div>
      )}
    </Card>
  );
};

export default AchievementCard;