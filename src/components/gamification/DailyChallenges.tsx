import React from 'react';
import { DailyChallenge } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Clock, Star, Trophy, AlertTriangle } from 'lucide-react';

interface DailyChallengesProps {
  challenges: DailyChallenge[];
  onStartChallenge: (challengeId: string) => void;
}

const DailyChallenges: React.FC<DailyChallengesProps> = ({
  challenges,
  onStartChallenge
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      default: return 'primary';
    }
  };

  const getTimeRemaining = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Daily Challenges</h3>
        <Badge variant="primary" size="md">
          {challenges.filter(c => !c.completed).length} Available
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className={challenge.completed ? 'opacity-75' : ''}>
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-gray-800">{challenge.title}</h4>
              <Badge variant={getDifficultyColor(challenge.difficulty)}>
                {challenge.difficulty}
              </Badge>
            </div>

            <p className="mt-2 text-gray-600 text-sm">{challenge.description}</p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{challenge.timeLimit} minutes</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Star className="h-4 w-4 text-amber-500" />
                <span>{challenge.xpReward} XP</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-rose-500">
                <AlertTriangle className="h-4 w-4" />
                <span>Expires in {getTimeRemaining(challenge.availableUntil)}</span>
              </div>
            </div>

            <div className="mt-4">
              <Button
                variant={challenge.completed ? 'success' : 'primary'}
                fullWidth
                onClick={() => onStartChallenge(challenge.id)}
                disabled={challenge.completed}
                icon={challenge.completed ? <Trophy className="h-4 w-4" /> : undefined}
              >
                {challenge.completed ? 'Completed' : 'Start Challenge'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DailyChallenges;