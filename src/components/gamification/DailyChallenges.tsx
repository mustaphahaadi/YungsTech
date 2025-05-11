import React, { useState } from 'react';
import { api, apiRequest, DailyChallenge } from '../../lib/api';
import { Calendar, CheckCircle, Code, BookOpen, Brain, PenTool } from 'lucide-react';
import Button from '../ui/Button';

interface DailyChallengesProps {
  challenges: DailyChallenge[];
}

const DailyChallenges: React.FC<DailyChallengesProps> = ({ challenges }) => {
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleCompleteChallenge = async (challengeId: string) => {
    setLoading(prev => ({ ...prev, [challengeId]: true }));
    
    try {
      await apiRequest(() => api.gamification.completeChallenge(challengeId));
      setCompletedChallenges(prev => [...prev, challengeId]);
    } catch (error) {
      console.error('Failed to complete challenge:', error);
    } finally {
      setLoading(prev => ({ ...prev, [challengeId]: false }));
    }
  };

  // Get challenge icon based on type
  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return <Brain className="w-5 h-5" />;
      case 'code':
        return <Code className="w-5 h-5" />;
      case 'reading':
        return <BookOpen className="w-5 h-5" />;
      case 'practice':
        return <PenTool className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  // Get challenge color based on difficulty
  const getChallengeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'hard':
        return 'bg-rose-100 text-rose-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Format time remaining
  const formatTimeRemaining = (dateString: string) => {
    const endDate = new Date(dateString);
    const now = new Date();
    const diffMs = endDate.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Expired';
    
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHrs > 0) {
      return `${diffHrs}h ${diffMins}m remaining`;
    }
    return `${diffMins}m remaining`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Daily Challenges</h2>
        <div className="p-2 bg-blue-100 rounded-lg">
          <Calendar className="w-5 h-5 text-blue-500" />
        </div>
      </div>

      {challenges.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500">No challenges available today.</p>
          <p className="text-sm text-gray-400 mt-1">Check back tomorrow!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {challenges.map(challenge => {
            const isCompleted = completedChallenges.includes(challenge.id);
            const isLoading = loading[challenge.id] || false;
            
            return (
              <div 
                key={challenge.id} 
                className={`p-4 border rounded-lg ${
                  isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg mr-3 ${getChallengeColor(challenge.difficulty)}`}>
                    {getChallengeIcon(challenge.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{challenge.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{challenge.description}</p>
                    
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getChallengeColor(challenge.difficulty)
                        }`}>
                          {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          +{challenge.xp_reward} XP
                        </span>
                      </div>
                      
                      {!isCompleted && (
                        <span className="text-xs text-gray-500">
                          {formatTimeRemaining(challenge.available_until)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {isCompleted ? (
                  <div className="mt-3 flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">Completed</span>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="mt-3"
                    disabled={isLoading}
                    onClick={() => handleCompleteChallenge(challenge.id)}
                  >
                    {isLoading ? 'Completing...' : 'Complete Challenge'}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DailyChallenges;