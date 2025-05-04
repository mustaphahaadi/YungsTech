import React from 'react';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import { mockUser, mockLearningPaths } from '../data/mockData';
import { Award, BookOpen, Clock, Star, Zap } from 'lucide-react';
import UserProfile from '../components/dashboard/UserProfile';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import Badge from '../components/ui/Badge';

// In a real app, these stats would come from the user's actual data
const mockStats = {
  totalLessonsAvailable: 23,
  totalTimeSpent: 340, // minutes
  averageScore: 85,
  streakDays: 4
};

const Progress: React.FC = () => {
  const completedLessons = mockUser.completedLessons.length;
  const completionPercentage = (completedLessons / mockStats.totalLessonsAvailable) * 100;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Star className="mr-2 h-6 w-6 text-indigo-500" />
          My Progress
        </h2>
      </div>
      
      {/* User Profile */}
      <UserProfile user={mockUser} />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<BookOpen className="h-6 w-6 text-indigo-500" />}
          title="Lessons Completed"
          value={completedLessons}
          total={mockStats.totalLessonsAvailable}
          progress={completionPercentage}
          color="indigo"
        />
        
        <StatCard 
          icon={<Clock className="h-6 w-6 text-emerald-500" />}
          title="Time Spent Learning"
          value={mockStats.totalTimeSpent}
          unit="mins"
          color="emerald"
        />
        
        <StatCard 
          icon={<Award className="h-6 w-6 text-amber-500" />}
          title="Average Score"
          value={mockStats.averageScore}
          unit="%"
          color="amber"
        />
        
        <StatCard 
          icon={<Zap className="h-6 w-6 text-rose-500" />}
          title="Learning Streak"
          value={mockStats.streakDays}
          unit="days"
          color="rose"
        />
      </div>
      
      {/* Current Learning Paths */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Current Learning Paths</h3>
        
        <div className="space-y-4">
          {mockLearningPaths.slice(0, 2).map(path => {
            // For demo, we'll calculate random progress
            const modules = path.modules.length;
            const lessons = path.modules.reduce((sum, module) => sum + module.lessons.length, 0);
            const completedModules = Math.floor(Math.random() * (modules + 1));
            const completedLessons = Math.floor(Math.random() * (lessons + 1));
            
            return (
              <Card key={path.id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-xl text-white ${
                      path.level === 'beginner' ? 'bg-emerald-500' : 
                      path.level === 'intermediate' ? 'bg-amber-500' : 
                      'bg-rose-500'
                    }`}>
                      <BookOpen className="h-6 w-6" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-gray-800">{path.title}</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant={
                            path.level === 'beginner' ? 'success' : 
                            path.level === 'intermediate' ? 'warning' : 
                            'danger'
                          }>
                            {path.level.charAt(0).toUpperCase() + path.level.slice(1)}
                          </Badge>
                          
                          <div className="text-sm text-gray-500">
                            {completedModules}/{modules} modules
                          </div>
                          
                          <div className="text-sm text-gray-500">
                            {completedLessons}/{lessons} lessons
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <div className="text-sm font-medium text-indigo-600">
                          {Math.round((completedLessons / lessons) * 100)}% Complete
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <ProgressBar 
                        value={completedLessons} 
                        max={lessons}
                        height="sm"
                        variant={
                          path.level === 'beginner' ? 'success' : 
                          path.level === 'intermediate' ? 'warning' : 
                          'danger'
                        }
                      />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  total?: number;
  unit?: string;
  progress?: number;
  color: 'indigo' | 'emerald' | 'amber' | 'rose';
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  total,
  unit,
  progress,
  color
}) => {
  const colorClasses = {
    'indigo': 'text-indigo-500 bg-indigo-50',
    'emerald': 'text-emerald-500 bg-emerald-50',
    'amber': 'text-amber-500 bg-amber-50',
    'rose': 'text-rose-500 bg-rose-50'
  };
  
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <h3 className="font-medium text-gray-700">{title}</h3>
      </div>
      
      <div className="mt-4">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-800">{value}</span>
          {total && <span className="text-gray-500 ml-1">/ {total}</span>}
          {unit && <span className="text-gray-500 ml-1">{unit}</span>}
        </div>
      </div>
      
      {progress !== undefined && (
        <div className="mt-3">
          <ProgressBar 
            value={value} 
            max={total || 100}
            height="sm"
            variant={color === 'indigo' ? 'primary' : 
                    color === 'emerald' ? 'success' : 
                    color === 'amber' ? 'warning' : 'danger'}
          />
        </div>
      )}
    </Card>
  );
};

export default Progress;