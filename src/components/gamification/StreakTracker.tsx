import React from 'react';
import { Streak } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Flame, Shield, Calendar, Trophy } from 'lucide-react';

interface StreakTrackerProps {
  streak: Streak;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ streak }) => {
  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-gray-800">Learning Streak</h3>
        {streak.protectionAvailable && (
          <Badge variant="primary" size="sm">
            <Shield className="h-3 w-3 mr-1" />
            Streak Protection Available
          </Badge>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Flame className="h-8 w-8 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{streak.current}</div>
          <div className="text-sm text-gray-600">Current Streak</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="h-8 w-8 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{streak.longest}</div>
          <div className="text-sm text-gray-600">Longest Streak</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="h-8 w-8 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{streak.weeklyStreak}</div>
          <div className="text-sm text-gray-600">Weekly Streak</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{streak.monthlyStreak}</div>
          <div className="text-sm text-gray-600">Monthly Streak</div>
        </div>
      </div>
    </Card>
  );
};

export default StreakTracker;