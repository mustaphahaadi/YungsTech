import React, { useState, useEffect } from 'react';
import { api, apiRequest, Achievement, UserAchievement } from '../lib/api';
import AchievementCard from '../components/learning/AchievementCard';
import { Award } from 'lucide-react';

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achievementsData, userAchievementsData] = await Promise.all([
          apiRequest(() => api.gamification.getAchievements()),
          apiRequest(() => api.gamification.getUserAchievements())
        ]);
        
        setAchievements(achievementsData);
        setUserAchievements(userAchievementsData);
      } catch (err: any) {
        setError(err.message || 'Failed to load achievements');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check if user has unlocked an achievement
  const isUnlocked = (achievementId: string): boolean => {
    return userAchievements.some(ua => ua.achievement.id === achievementId);
  };

  // Get unlock date for an achievement
  const getUnlockDate = (achievementId: string): string | null => {
    const userAchievement = userAchievements.find(ua => ua.achievement.id === achievementId);
    return userAchievement ? userAchievement.unlocked_at : null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-sm font-medium text-rose-800 hover:text-rose-900"
        >
          Try again
        </button>
      </div>
    );
  }

  // Calculate stats
  const totalAchievements = achievements.length;
  const unlockedAchievements = userAchievements.length;
  const completionPercentage = totalAchievements > 0 
    ? Math.round((unlockedAchievements / totalAchievements) * 100) 
    : 0;
  const totalXP = userAchievements.reduce((sum, ua) => sum + ua.achievement.xp_reward, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Achievements</h1>
        <p className="text-gray-600 mt-2">
          Track your progress and earn rewards as you learn
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-lg mr-3">
              <Award className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Unlocked</div>
              <div className="text-xl font-bold text-gray-800">
                {unlockedAchievements}/{totalAchievements}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-3">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Completion</div>
              <div className="text-xl font-bold text-gray-800">
                {completionPercentage}%
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg mr-3">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">XP Earned</div>
              <div className="text-xl font-bold text-gray-800">
                {totalXP} XP
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            unlocked={isUnlocked(achievement.id)}
            unlockedAt={getUnlockDate(achievement.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Achievements;