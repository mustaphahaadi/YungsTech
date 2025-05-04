import React from 'react';
import { mockAchievements } from '../data/mockData';
import AchievementCard from '../components/learning/AchievementCard';
import ProgressBar from '../components/ui/ProgressBar';
import { Trophy } from 'lucide-react';

const Achievements: React.FC = () => {
  // Calculate progress
  const totalAchievements = mockAchievements.length;
  const unlockedAchievements = mockAchievements.filter(a => a.unlockedAt).length;
  const progressPercentage = (unlockedAchievements / totalAchievements) * 100;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Trophy className="mr-2 h-6 w-6 text-amber-500" />
          Achievements
        </h2>
      </div>
      
      {/* Progress Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
        <h3 className="font-bold text-lg text-gray-800">Achievement Progress</h3>
        <p className="text-gray-600 mt-1">Collect achievements by completing lessons and challenges!</p>
        
        <div className="mt-4">
          <ProgressBar 
            value={unlockedAchievements} 
            max={totalAchievements}
            label="Achievements Unlocked"
            showValue
            variant="warning"
            height="md"
          />
        </div>
        
        <div className="mt-3 flex flex-wrap gap-3">
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
            <div className="text-2xl font-bold text-amber-500">{unlockedAchievements}</div>
            <div className="text-xs text-gray-500">Unlocked</div>
          </div>
          
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
            <div className="text-2xl font-bold text-gray-400">{totalAchievements - unlockedAchievements}</div>
            <div className="text-xs text-gray-500">Locked</div>
          </div>
        </div>
      </div>
      
      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockAchievements.map(achievement => (
          <AchievementCard 
            key={achievement.id}
            achievement={achievement}
          />
        ))}
      </div>
    </div>
  );
};

export default Achievements;