import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Settings } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Calculate XP progress to next level
  const xpForCurrentLevel = user.level * 100;
  const xpForNextLevel = (user.level + 1) * 100;
  const xpProgress = ((user.xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Your Profile</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center mb-6">
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.username} 
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="w-8 h-8 text-indigo-500" />
          </div>
        )}
        
        <div className="ml-4">
          <h3 className="font-bold text-gray-800">{user.username}</h3>
          <div className="flex items-center mt-1">
            <Badge color="indigo">Level {user.level}</Badge>
            <span className="ml-2 text-sm text-gray-500">{user.xp} XP</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Level Progress</span>
          <span className="text-xs text-gray-500">
            {user.xp - xpForCurrentLevel}/{xpForNextLevel - xpForCurrentLevel} XP
          </span>
        </div>
        <ProgressBar progress={xpProgress} />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Learning Speed</span>
          <span className="text-sm font-medium text-gray-800">
            {user.learning_speed.charAt(0).toUpperCase() + user.learning_speed.slice(1)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Learning Style</span>
          <span className="text-sm font-medium text-gray-800">
            {user.preferred_learning_style.charAt(0).toUpperCase() + user.preferred_learning_style.slice(1)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Daily Goal</span>
          <span className="text-sm font-medium text-gray-800">
            {user.daily_goal} minutes
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;