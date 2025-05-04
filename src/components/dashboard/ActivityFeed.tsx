import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Award, BookOpen, Flag, Star, Trophy } from 'lucide-react';

interface ActivityItem {
  id: string;
  date: Date;
  type: 'lesson_completed' | 'achievement_unlocked' | 'level_up' | 'path_started';
  title: string;
  description: string;
  xp?: number;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    date: new Date('2023-10-02T15:30:00'),
    type: 'lesson_completed',
    title: 'Completed "What is a Computer?"',
    description: 'You finished your first lesson!',
    xp: 10
  },
  {
    id: '2',
    date: new Date('2023-10-02T15:45:00'),
    type: 'achievement_unlocked',
    title: 'Achievement Unlocked: First Steps',
    description: 'Complete your first lesson',
    xp: 50
  },
  {
    id: '3',
    date: new Date('2023-10-03T10:15:00'),
    type: 'lesson_completed',
    title: 'Completed "Mouse and Keyboard Skills"',
    description: 'You\'re getting better at using the computer!',
    xp: 15
  },
  {
    id: '4',
    date: new Date('2023-10-04T14:20:00'),
    type: 'level_up',
    title: 'Leveled Up to Level 2!',
    description: 'Keep going to unlock more content',
    xp: 100
  }
];

const ActivityFeed: React.FC = () => {
  return (
    <Card bordered>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-800">Recent Activity</h3>
      </div>
      
      <div className="space-y-4">
        {mockActivities.map(activity => (
          <div key={activity.id} className="flex gap-4">
            <div className={`flex-shrink-0 rounded-full p-2 ${getActivityIconBg(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-800">{activity.title}</h4>
                <span className="text-sm text-gray-500">
                  {formatDate(activity.date)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              
              {activity.xp && (
                <div className="mt-2 flex items-center">
                  <Star className="h-3.5 w-3.5 text-amber-500 mr-1" />
                  <span className="text-xs font-medium text-amber-600">+{activity.xp} XP</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Helper functions
const getActivityIcon = (type: string) => {
  switch(type) {
    case 'lesson_completed':
      return <BookOpen className="h-5 w-5 text-white" />;
    case 'achievement_unlocked':
      return <Trophy className="h-5 w-5 text-white" />;
    case 'level_up':
      return <Award className="h-5 w-5 text-white" />;
    case 'path_started':
      return <Flag className="h-5 w-5 text-white" />;
    default:
      return <Star className="h-5 w-5 text-white" />;
  }
};

const getActivityIconBg = (type: string) => {
  switch(type) {
    case 'lesson_completed':
      return 'bg-emerald-500';
    case 'achievement_unlocked':
      return 'bg-amber-500';
    case 'level_up':
      return 'bg-indigo-500';
    case 'path_started':
      return 'bg-sky-500';
    default:
      return 'bg-gray-500';
  }
};

const formatDate = (date: Date) => {
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
};

export default ActivityFeed;