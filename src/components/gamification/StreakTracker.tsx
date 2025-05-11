import React, { useState, useEffect } from 'react';
import { api, apiRequest, Streak } from '../../lib/api';
import { Flame } from 'lucide-react';
import Button from '../ui/Button';

const StreakTracker: React.FC = () => {
  const [streak, setStreak] = useState<Streak | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        // For now, we'll just check in to get the streak data
        // In a real app, you'd have a separate endpoint to get streak without checking in
        const streakData = await apiRequest(() => api.gamification.checkInStreak());
        setStreak(streakData);
      } catch (err: any) {
        setError(err.message || 'Failed to load streak data');
      } finally {
        setLoading(false);
      }
    };

    fetchStreak();
  }, []);

  const handleCheckIn = async () => {
    setCheckingIn(true);
    try {
      const updatedStreak = await apiRequest(() => api.gamification.checkInStreak());
      setStreak(updatedStreak);
    } catch (err: any) {
      setError(err.message || 'Failed to check in');
    } finally {
      setCheckingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-10 w-10"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-rose-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!streak) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Daily Streak</h2>
        <div className="p-2 bg-orange-100 rounded-lg">
          <Flame className="w-5 h-5 text-orange-500" />
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-3xl font-bold text-gray-800">{streak.current}</div>
          <div className="text-sm text-gray-500">Current streak</div>
        </div>
        
        <div>
          <div className="text-3xl font-bold text-gray-800">{streak.longest}</div>
          <div className="text-sm text-gray-500">Longest streak</div>
        </div>
      </div>

      <Button
        variant="primary"
        fullWidth
        disabled={checkingIn}
        onClick={handleCheckIn}
        icon={<Flame className="w-4 h-4" />}
      >
        {checkingIn ? 'Checking in...' : 'Check in for today'}
      </Button>
      
      {streak.protection_available && (
        <div className="mt-3 text-center text-sm text-gray-500">
          <span className="text-orange-500">Streak protection available</span>
        </div>
      )}
    </div>
  );
};

export default StreakTracker;