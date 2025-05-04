import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockLearningPaths, mockUser, mockDailyChallenges, mockUserProgress } from '../data/mockData';
import LearningPathCard from '../components/learning/LearningPathCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import UserProfile from '../components/dashboard/UserProfile';
import DailyChallenges from '../components/gamification/DailyChallenges';
import StreakTracker from '../components/gamification/StreakTracker';
import AnalyticsWidget from '../components/dashboard/AnalyticsWidget';
import { BookOpen, Notebook as Robot, Star } from 'lucide-react';

interface HomeProps {
  onNavigateToPath: (pathId: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateToPath }) => {
  const recommendedPaths = mockLearningPaths.slice(0, 2);
  
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-white opacity-10 w-64 h-64 rounded-full -mt-20 -mr-20"></div>
        <div className="absolute bottom-0 left-0 bg-white opacity-10 w-40 h-40 rounded-full -mb-10 -ml-10"></div>
        
        <div className="relative">
          <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {mockUser.name}! 👋</h1>
          <p className="mt-2 max-w-xl opacity-90">Ready to continue your learning adventure? You're on your way to becoming a tech superstar!</p>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <Button 
              variant="primary" 
              className="bg-white text-blue-600 hover:bg-blue-50"
              icon={<BookOpen className="h-4 w-4" />}
            >
              Continue Learning
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              icon={<Star className="h-4 w-4" />}
            >
              View Progress
            </Button>
          </div>
        </div>
      </div>
      
      {/* Streak Tracker */}
      <StreakTracker streak={mockUserProgress.streak} />

      {/* Daily Challenges */}
      <DailyChallenges 
        challenges={mockDailyChallenges}
        onStartChallenge={(id) => console.log('Starting challenge:', id)}
      />
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Profile Summary */}
          <UserProfile user={mockUser} />
          
          {/* Recommended Paths */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedPaths.map(path => (
                <LearningPathCard 
                  key={path.id} 
                  path={path} 
                  onClick={() => onNavigateToPath(path.id)} 
                  isActive={path.id === mockUser.currentPath}
                />
              ))}
            </div>
          </div>
          
          {/* Featured Content */}
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-none">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500 text-white p-3 rounded-lg">
                <Robot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Featured: Intro to Robotics</h3>
                <p className="text-gray-600">Learn how robots work and even program your own virtual robot!</p>
                <Button variant="secondary" size="sm" className="mt-3">
                  Explore
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Activity Feed */}
          <ActivityFeed />
          
          {/* Quick Access */}
          <Card bordered>
            <h3 className="font-bold text-lg text-gray-800 mb-4">Quick Access</h3>
            <div className="space-y-2">
              <QuickAccessButton 
                icon={<BookOpen className="h-5 w-5 text-blue-500" />}
                title="Continue learning"
                subtitle="Computer Basics"
                onClick={() => onNavigateToPath('path-1')}
              />
              <QuickAccessButton 
                icon={<Star className="h-5 w-5 text-amber-500" />}
                title="Achievements"
                subtitle="See your progress"
              />
              <QuickAccessButton 
                icon={<Robot className="h-5 w-5 text-emerald-500" />}
                title="Coding Playground"
                subtitle="Try your skills"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface QuickAccessButtonProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

const QuickAccessButton: React.FC<QuickAccessButtonProps> = ({
  icon,
  title,
  subtitle,
  onClick
}) => {
  return (
    <button 
      className="w-full p-3 rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
      onClick={onClick}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </button>
  );
};

export default Home;