import React from 'react';
import { Clock, Calendar, TrendingUp } from 'lucide-react';

// Mock data for analytics
// In a real app, this would come from an API
const analytics = {
  weeklyProgress: {
    timeSpent: 210, // minutes
    lessonsCompleted: 5,
    xpEarned: 350
  },
  weeklyGoal: 300, // minutes
  weeklyCompletion: 70, // percentage
  dailyStreak: 3
};

const AnalyticsWidget: React.FC = () => {
  // Format minutes as hours and minutes
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-sm font-medium text-gray-700">Weekly Progress</span>
          </div>
          <span className="text-sm text-gray-500">
            {formatTime(analytics.weeklyProgress.timeSpent)} / {formatTime(analytics.weeklyGoal)}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full" 
            style={{ width: `${analytics.weeklyCompletion}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>{analytics.weeklyCompletion}% of weekly goal</span>
          <span>{formatTime(analytics.weeklyGoal - analytics.weeklyProgress.timeSpent)} remaining</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-gray-800">
            {analytics.weeklyProgress.lessonsCompleted}
          </div>
          <div className="text-xs text-gray-500 mt-1">Lessons</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-gray-800">
            {analytics.weeklyProgress.xpEarned}
          </div>
          <div className="text-xs text-gray-500 mt-1">XP Earned</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-gray-800">
            {analytics.dailyStreak}
          </div>
          <div className="text-xs text-gray-500 mt-1">Day Streak</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-1" />
          <span>This Week</span>
        </div>
        
        <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-800">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
};

export default AnalyticsWidget;