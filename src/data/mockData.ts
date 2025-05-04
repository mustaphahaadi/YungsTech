import { User, LearningPath, Achievement, Exercise, DailyChallenge, Badge, UserProgress } from '../types';
import { Brain, Code, Computer, TowerControl as GameController, Globe, Lock, Medal, Palette, Notebook as Robot, Rocket, Trophy, Zap } from 'lucide-react';

export const mockUser: User = {
  id: '1',
  name: 'Alex',
  avatar: 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=300',
  level: 2,
  xp: 350,
  achievements: [
    {
      id: '1',
      title: 'First Login',
      description: 'Logged in for the first time',
      icon: 'rocket',
      unlockedAt: new Date('2023-10-01')
    },
    {
      id: '2',
      title: 'Code Rookie',
      description: 'Completed first coding exercise',
      icon: 'code',
      unlockedAt: new Date('2023-10-02')
    }
  ],
  completedLessons: ['lesson-1', 'lesson-2'],
  currentPath: 'path-1'
};

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Login',
    description: 'Logged in for the first time',
    icon: 'rocket',
    unlockedAt: new Date('2023-10-01')
  },
  {
    id: '2',
    title: 'Code Rookie',
    description: 'Completed first coding exercise',
    icon: 'code',
    unlockedAt: new Date('2023-10-02')
  },
  {
    id: '3',
    title: 'Web Wizard',
    description: 'Built your first webpage',
    icon: 'globe',
    unlockedAt: undefined
  },
  {
    id: '4',
    title: 'Bug Hunter',
    description: 'Fixed 5 code errors',
    icon: 'zap',
    unlockedAt: undefined
  },
  {
    id: '5',
    title: 'Digital Artist',
    description: 'Created your first digital artwork',
    icon: 'palette',
    unlockedAt: undefined
  }
];

export const mockLearningPaths: LearningPath[] = [
  {
    id: 'path-1',
    title: 'Computer Basics',
    description: 'Learn how computers work and basic digital skills',
    icon: 'computer',
    level: 'beginner',
    ageRange: '6-8',
    modules: [
      {
        id: 'module-1',
        title: 'Getting Started',
        description: 'Learn the basics of using a computer',
        icon: 'rocket',
        lessons: [
          {
            id: 'lesson-1',
            title: 'What is a Computer?',
            description: 'Learn about computers and what they do',
            type: 'video',
            duration: 5,
            xpReward: 10
          },
          {
            id: 'lesson-2',
            title: 'Mouse and Keyboard Skills',
            description: 'Practice using the mouse and keyboard',
            type: 'interactive',
            duration: 10,
            xpReward: 15
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Digital Safety',
        description: 'Stay safe online',
        icon: 'lock',
        lessons: [
          {
            id: 'lesson-3',
            title: 'Internet Safety Rules',
            description: 'Learn how to stay safe online',
            type: 'video',
            duration: 8,
            xpReward: 15
          },
          {
            id: 'lesson-4',
            title: 'Safety Quiz',
            description: 'Test your knowledge about online safety',
            type: 'quiz',
            duration: 10,
            xpReward: 20
          }
        ]
      }
    ]
  },
  {
    id: 'path-2',
    title: 'Block Coding',
    description: 'Learn programming concepts using visual blocks',
    icon: 'brain',
    level: 'beginner',
    ageRange: '8-10',
    modules: [
      {
        id: 'module-3',
        title: 'Sequences',
        description: 'Learn about order of instructions',
        icon: 'list',
        lessons: [
          {
            id: 'lesson-5',
            title: 'What is a Sequence?',
            description: 'Learn about ordering commands',
            type: 'video',
            duration: 5,
            xpReward: 10
          },
          {
            id: 'lesson-6',
            title: 'Build a Sequence',
            description: 'Create your first sequence of commands',
            type: 'interactive',
            duration: 15,
            xpReward: 25
          }
        ]
      }
    ]
  },
  {
    id: 'path-3',
    title: 'Web Development',
    description: 'Create your own websites with HTML and CSS',
    icon: 'globe',
    level: 'intermediate',
    ageRange: '10-12',
    modules: [
      {
        id: 'module-4',
        title: 'HTML Basics',
        description: 'Learn the building blocks of web pages',
        icon: 'code',
        lessons: [
          {
            id: 'lesson-7',
            title: 'What is HTML?',
            description: 'Introduction to HTML tags',
            type: 'video',
            duration: 8,
            xpReward: 15
          },
          {
            id: 'lesson-8',
            title: 'Create a Simple Page',
            description: 'Build your first web page',
            type: 'project',
            duration: 20,
            xpReward: 35
          }
        ]
      }
    ]
  },
  {
    id: 'path-4',
    title: 'Game Design',
    description: 'Create your own simple games',
    icon: 'gameController',
    level: 'advanced',
    ageRange: '12-14',
    modules: [
      {
        id: 'module-5',
        title: 'Game Concepts',
        description: 'Learn about game design fundamentals',
        icon: 'trophy',
        lessons: [
          {
            id: 'lesson-9',
            title: 'Game Elements',
            description: 'Learn about the components of games',
            type: 'video',
            duration: 10,
            xpReward: 20
          },
          {
            id: 'lesson-10',
            title: 'Design Your Character',
            description: 'Create a game character',
            type: 'project',
            duration: 25,
            xpReward: 40
          }
        ]
      }
    ]
  }
];

export const mockExercises: Exercise[] = [
  {
    id: 'exercise-1',
    title: 'Move the Robot',
    description: 'Help the robot reach the flag by creating a sequence of movements',
    instructions: 'Drag the movement blocks in the correct order to guide the robot to the flag.',
    difficulty: 'easy',
    language: 'blocks',
    starterCode: '// Blocks will appear here',
    solution: 'moveForward(); moveForward(); turnRight(); moveForward();',
    hints: ['Think about the order of steps', 'The robot needs to turn at some point']
  },
  {
    id: 'exercise-2',
    title: 'Create a Heading',
    description: 'Write HTML code to create a heading for your webpage',
    instructions: 'Use the h1 tag to create a heading that says "My Awesome Page"',
    difficulty: 'easy',
    language: 'html',
    starterCode: '<!-- Write your code here -->',
    solution: '<h1>My Awesome Page</h1>',
    hints: ['Headings use the h1 tag', 'Don\'t forget to close your tag']
  }
];

export const mockDailyChallenges: DailyChallenge[] = [
  {
    id: '1',
    title: 'HTML Basics Quiz',
    description: 'Test your knowledge of HTML fundamentals',
    difficulty: 'easy',
    type: 'quiz',
    xpReward: 50,
    timeLimit: 10,
    availableUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
    completed: false
  },
  {
    id: '2',
    title: 'Debug the Code',
    description: 'Find and fix the bugs in this JavaScript code',
    difficulty: 'medium',
    type: 'code',
    xpReward: 100,
    timeLimit: 15,
    availableUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
    completed: false
  },
  {
    id: '3',
    title: 'CSS Challenge',
    description: 'Style a webpage according to the design',
    difficulty: 'hard',
    type: 'practice',
    xpReward: 150,
    timeLimit: 20,
    availableUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
    completed: false
  }
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    title: 'Code Ninja',
    description: 'Complete 50 coding challenges',
    icon: 'code',
    tier: 'gold',
    progress: 45,
    maxProgress: 50,
    hidden: false
  },
  {
    id: '2',
    title: 'Bug Hunter',
    description: 'Find and fix 25 bugs',
    icon: 'bug',
    tier: 'silver',
    progress: 15,
    maxProgress: 25,
    hidden: false
  },
  {
    id: '3',
    title: 'Mystery Achievement',
    description: '???',
    icon: 'question',
    tier: 'platinum',
    progress: 0,
    maxProgress: 1,
    hidden: true
  }
];

export const mockUserProgress: UserProgress = {
  userId: '1',
  level: 12,
  xp: 350,
  totalXp: 5350,
  xpToNextLevel: 1000,
  streak: {
    current: 5,
    longest: 15,
    lastLoginDate: new Date(),
    protectionAvailable: true,
    weeklyStreak: 1,
    monthlyStreak: 1
  },
  badges: mockBadges,
  skillTrees: {},
  completedChallenges: ['1', '2'],
  multiplier: 1.5,
  rank: 42
};

export const getIconComponent = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'brain': return Brain;
    case 'code': return Code;
    case 'computer': return Computer;
    case 'gamecontroller': return GameController;
    case 'globe': return Globe;
    case 'lock': return Lock;
    case 'medal': return Medal;
    case 'palette': return Palette;
    case 'robot': return Robot;
    case 'rocket': return Rocket;
    case 'trophy': return Trophy;
    case 'zap': return Zap;
    default: return Rocket;
  }
};