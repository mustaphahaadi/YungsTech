import React from 'react';
import { CheckCircle, Award, BookOpen, Code } from 'lucide-react';

// Mock data for activity feed
// In a real app, this would come from an API
const activities = [
  {
    id: 1,
    type: 'lesson_completed',
    title: 'Completed "Introduction to Python"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    xp: 50,
    icon: <CheckCircle className="w-4 h-4" />,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 2,
    type: 'achievement_unlocked',
    title: 'Unlocked "First Steps" achievement',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    xp: 100,
    icon: <Award className="w-4 h-4" />,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    id: 3,
    type: 'path_started',
    title: 'Started "Web Development Basics" path',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    xp: 10,
    icon: <BookOpen className="w-4 h-4" />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 4,
    type: 'challenge_completed',
    title: 'Completed daily coding challenge',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    xp: 75,
    icon: <Code className="w-4 h-4" />,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600'
  }
];

const ActivityFeed: React.FC = () => {
  // Format relative time
  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`;
    }
    if (diffHours > 0) {
      return `${diffHours}h ago`;
    }
    if (diffMins > 0) {
      return `${diffMins}m ago`;
    }
    return 'Just now';
  };

  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div key={activity.id} className="flex items-start">
          <div className={`p-2 rounded-full mr-3 ${activity.iconBg} ${activity.iconColor}`}>
            {activity.icon}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-800">{activity.title}</h4>
              <span className="text-xs text-gray-500">
                {formatRelativeTime(activity.timestamp)}
              </span>
            </div>
            
            <div className="text-xs text-gray-500 mt-1">
              +{activity.xp} XP
            </div>
          </div>
        </div>
      ))}
      
      <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium mt-2">
        View all activity
      </button>
    </div>
  );
};

export default ActivityFeed;