import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import { Trophy, Medal, Star, Filter } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  user: {
    name: string;
    avatar: string;
    level: number;
  };
  xp: number;
  achievements: number;
  streak: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      name: "Sarah Chen",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      level: 12
    },
    xp: 12500,
    achievements: 25,
    streak: 15
  },
  {
    rank: 2,
    user: {
      name: "Mike Johnson",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      level: 11
    },
    xp: 11200,
    achievements: 22,
    streak: 10
  },
  {
    rank: 3,
    user: {
      name: "Emily Davis",
      avatar: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg",
      level: 10
    },
    xp: 10800,
    achievements: 20,
    streak: 8
  }
];

const Leaderboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Trophy className="mr-2 h-6 w-6 text-blue-500" />
          Leaderboard
        </h2>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="allTime">All Time</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockLeaderboard.slice(0, 3).map((entry, index) => (
          <Card
            key={entry.rank}
            className={`text-center p-8 ${
              index === 0
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                : 'bg-white'
            }`}
          >
            <div className="relative inline-block">
              <Avatar
                src={entry.user.avatar}
                alt={entry.user.name}
                size="xl"
                className="border-4 border-white shadow-lg"
              />
              <div className={`absolute -bottom-2 -right-2 rounded-full p-2 ${
                index === 0 ? 'bg-yellow-400' :
                index === 1 ? 'bg-gray-300' :
                'bg-amber-600'
              }`}>
                <Trophy className="h-4 w-4 text-white" />
              </div>
            </div>

            <h3 className={`text-lg font-bold mt-4 ${
              index === 0 ? 'text-white' : 'text-gray-800'
            }`}>
              {entry.user.name}
            </h3>

            <div className={`flex justify-center items-center gap-2 mt-2 ${
              index === 0 ? 'text-blue-100' : 'text-gray-500'
            }`}>
              <Star className="h-4 w-4" />
              <span>Level {entry.user.level}</span>
            </div>

            <div className={`mt-4 grid grid-cols-3 gap-2 ${
              index === 0 ? 'text-blue-100' : 'text-gray-600'
            }`}>
              <div>
                <div className="text-2xl font-bold">{entry.xp.toLocaleString()}</div>
                <div className="text-xs">XP</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{entry.achievements}</div>
                <div className="text-xs">Badges</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{entry.streak}</div>
                <div className="text-xs">Streak</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-gray-500 font-medium">Rank</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium">Student</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium">Level</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium">XP</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium">Achievements</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium">Streak</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboard.map((entry) => (
                <tr key={entry.rank} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${
                        entry.rank === 1 ? 'text-yellow-500' :
                        entry.rank === 2 ? 'text-gray-400' :
                        entry.rank === 3 ? 'text-amber-600' :
                        'text-gray-600'
                      }`}>
                        #{entry.rank}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={entry.user.avatar}
                        alt={entry.user.name}
                        size="sm"
                      />
                      <span className="font-medium text-gray-800">{entry.user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-gray-600">
                      <Star className="h-4 w-4 text-blue-500" />
                      {entry.user.level}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{entry.xp.toLocaleString()} XP</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-gray-600">
                      <Medal className="h-4 w-4 text-blue-500" />
                      {entry.achievements}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{entry.streak} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Leaderboard;