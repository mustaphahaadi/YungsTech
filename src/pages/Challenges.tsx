import React, { useState } from 'react';
import { Calendar, Clock, Award, Code, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'code' | 'quiz' | 'project';
  xpReward: number;
  timeEstimate: number; // in minutes
  dueDate: string;
  completed: boolean;
  progress?: number;
}

const Challenges: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'completed'>('daily');
  
  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'JavaScript Array Methods',
      description: 'Complete a series of challenges using JavaScript array methods like map, filter, and reduce.',
      difficulty: 'medium',
      type: 'code',
      xpReward: 150,
      timeEstimate: 30,
      dueDate: '2023-11-15',
      completed: false,
      progress: 0.6
    },
    {
      id: '2',
      title: 'CSS Flexbox Layout',
      description: 'Create a responsive layout using CSS Flexbox according to the provided design.',
      difficulty: 'easy',
      type: 'code',
      xpReward: 100,
      timeEstimate: 20,
      dueDate: '2023-11-15',
      completed: false
    },
    {
      id: '3',
      title: 'Python Data Structures Quiz',
      description: 'Test your knowledge of Python data structures with this comprehensive quiz.',
      difficulty: 'medium',
      type: 'quiz',
      xpReward: 120,
      timeEstimate: 15,
      dueDate: '2023-11-15',
      completed: true
    },
    {
      id: '4',
      title: 'Build a Weather App',
      description: 'Create a simple weather application that fetches data from a public API.',
      difficulty: 'hard',
      type: 'project',
      xpReward: 300,
      timeEstimate: 120,
      dueDate: '2023-11-22',
      completed: false,
      progress: 0.25
    },
    {
      id: '5',
      title: 'SQL Query Challenges',
      description: 'Practice your SQL skills by solving these database query challenges.',
      difficulty: 'medium',
      type: 'code',
      xpReward: 150,
      timeEstimate: 45,
      dueDate: '2023-11-22',
      completed: false
    },
    {
      id: '6',
      title: 'Git Workflow Quiz',
      description: 'Test your knowledge of Git commands and workflow best practices.',
      difficulty: 'easy',
      type: 'quiz',
      xpReward: 80,
      timeEstimate: 10,
      dueDate: '2023-11-22',
      completed: true
    },
    {
      id: '7',
      title: 'React Component Lifecycle',
      description: 'Create React components and demonstrate understanding of the component lifecycle.',
      difficulty: 'medium',
      type: 'code',
      xpReward: 180,
      timeEstimate: 40,
      dueDate: '2023-11-08',
      completed: true
    },
    {
      id: '8',
      title: 'Build a Todo App',
      description: 'Create a simple todo application with CRUD functionality.',
      difficulty: 'medium',
      type: 'project',
      xpReward: 200,
      timeEstimate: 90,
      dueDate: '2023-11-08',
      completed: true
    }
  ];
  
  const dailyChallenges = challenges.filter(challenge => 
    !challenge.completed && new Date(challenge.dueDate).toDateString() === new Date().toDateString()
  );
  
  const weeklyChallenges = challenges.filter(challenge => 
    !challenge.completed && 
    new Date(challenge.dueDate) > new Date() && 
    new Date(challenge.dueDate).toDateString() !== new Date().toDateString()
  );
  
  const completedChallenges = challenges.filter(challenge => challenge.completed);
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'code':
        return <Code className="w-5 h-5" />;
      case 'quiz':
        return <AlertCircle className="w-5 h-5" />;
      case 'project':
        return <Calendar className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const renderChallengeList = (challengeList: Challenge[]) => {
    if (challengeList.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-medium text-gray-900 mb-2">No challenges found</h3>
          <p className="text-gray-600">
            {activeTab === 'daily' 
              ? 'You have completed all daily challenges. Check back tomorrow for new ones!' 
              : activeTab === 'weekly' 
                ? 'No weekly challenges available at the moment.' 
                : 'You haven\'t completed any challenges yet.'}
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {challengeList.map(challenge => (
          <div 
            key={challenge.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-indigo-500"
          >
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                    </span>
                    <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium flex items-center">
                      {getTypeIcon(challenge.type)}
                      <span className="ml-1">{challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}</span>
                    </span>
                    <Badge color="indigo" className="ml-2">
                      {challenge.xpReward} XP
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{challenge.title}</h3>
                  <p className="text-gray-600 mb-4">{challenge.description}</p>
                  
                  <div className="flex flex-wrap items-center text-sm text-gray-500">
                    <div className="flex items-center mr-4 mb-2 sm:mb-0">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{challenge.timeEstimate} min</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Due {formatDate(challenge.dueDate)}</span>
                    </div>
                  </div>
                  
                  {challenge.progress !== undefined && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-900 font-medium">{Math.round(challenge.progress * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${challenge.progress * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
                  {challenge.completed ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-1" />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <Button variant="primary">
                      {challenge.progress !== undefined ? 'Continue' : 'Start Challenge'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Challenges</h1>
        <p className="text-gray-600">
          Complete challenges to earn XP, unlock achievements, and improve your skills.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Award className="w-6 h-6 text-indigo-600 mr-2" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Daily Challenge Streak</h3>
              <p className="text-gray-600">Complete daily challenges to maintain your streak</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-center mr-6">
              <div className="text-3xl font-bold text-indigo-600">7</div>
              <div className="text-sm text-gray-500">Current</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">14</div>
              <div className="text-sm text-gray-500">Best</div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">Next streak milestone: 10 days</span>
            <span className="text-gray-900 font-medium">7/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('daily')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'daily'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Daily Challenges
              {dailyChallenges.length > 0 && (
                <span className="ml-2 bg-indigo-100 text-indigo-600 py-0.5 px-2 rounded-full text-xs">
                  {dailyChallenges.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'weekly'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Weekly Challenges
              {weeklyChallenges.length > 0 && (
                <span className="ml-2 bg-indigo-100 text-indigo-600 py-0.5 px-2 rounded-full text-xs">
                  {weeklyChallenges.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed
              {completedChallenges.length > 0 && (
                <span className="ml-2 bg-green-100 text-green-600 py-0.5 px-2 rounded-full text-xs">
                  {completedChallenges.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'daily' && renderChallengeList(dailyChallenges)}
      {activeTab === 'weekly' && renderChallengeList(weeklyChallenges)}
      {activeTab === 'completed' && renderChallengeList(completedChallenges)}
    </div>
  );
};

export default Challenges;