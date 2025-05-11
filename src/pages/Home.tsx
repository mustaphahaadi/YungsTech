import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api, apiRequest, LearningPath, DailyChallenge } from '../lib/api';
import UserProfile from '../components/dashboard/UserProfile';
import StreakTracker from '../components/gamification/StreakTracker';
import DailyChallenges from '../components/gamification/DailyChallenges';
import PersonalizedPathCard from '../components/learning/PersonalizedPathCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import AnalyticsWidget from '../components/dashboard/AnalyticsWidget';

interface HomeProps {
  onNavigateToPath: (pathId: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateToPath }) => {
  const { user } = useAuth();
  const [recommendedPaths, setRecommendedPaths] = useState<LearningPath[]>([]);
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [pathsData, challengesData] = await Promise.all([
          apiRequest(() => api.learning.getPaths()),
          apiRequest(() => api.gamification.getDailyChallenges())
        ]);
        
        // For now, just use all paths as recommended
        // In a real app, you'd have a recommendation algorithm
        setRecommendedPaths(pathsData.slice(0, 3));
        setDailyChallenges(challengesData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome back, {user?.username || 'Learner'}!
          </h2>
          <p className="text-gray-600">
            Continue your learning journey where you left off.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recommended for you
          </h2>
          <div className="space-y-4">
            {recommendedPaths.map(path => (
              <PersonalizedPathCard 
                key={path.id} 
                path={path} 
                onClick={() => onNavigateToPath(path.id)} 
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Your Activity
          </h2>
          <ActivityFeed />
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-6">
        <UserProfile />
        
        <StreakTracker />
        
        <DailyChallenges challenges={dailyChallenges} />
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Your Progress
          </h2>
          <AnalyticsWidget />
        </div>
      </div>
    </div>
  );
};

export default Home;