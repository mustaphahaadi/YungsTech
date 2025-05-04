import React from 'react';
import { User } from '../../types';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import ProgressBar from '../ui/ProgressBar';
import Badge from '../ui/Badge';
import { Award, BookOpen, Star } from 'lucide-react';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  // Calculate how many XP needed for next level (simple formula for demo)
  const xpForNextLevel = user.level * 500;
  
  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <Avatar 
            src={user.avatar} 
            alt={user.name}
            size="xl"
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
            <Badge variant="primary" size="md">
              Level {user.level}
            </Badge>
            
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-amber-500" />
              <span className="text-gray-600">{user.achievements.filter(a => a.unlockedAt).length} Achievements</span>
            </div>
            
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-emerald-500" />
              <span className="text-gray-600">{user.completedLessons.length} Lessons completed</span>
            </div>
          </div>
          
          <div className="mt-4 w-full">
            <ProgressBar 
              value={user.xp} 
              max={xpForNextLevel}
              label="Experience"
              showValue
              variant="primary"
              height="md"
            />
            <p className="text-sm text-gray-600 mt-1">{xpForNextLevel - user.xp} XP until Level {user.level + 1}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;