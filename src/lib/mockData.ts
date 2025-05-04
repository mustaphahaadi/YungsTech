// Mock data to replace Supabase data

import { User, LearningPath, Achievement, Exercise, DailyChallenge, StudyGroup } from '../types';

// Mock user data
export const mockUser: User = {
  id: 'user_1',
  name: 'Alex Johnson',
  avatar: 'https://i.pravatar.cc/150?img=11',
  level: 5,
  xp: 1250,
  achievements: [
    {
      id: 'ach_1',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: 'trophy',
      unlockedAt: new Date('2023-10-15')
    },
    {
      id: 'ach_2',
      title: 'Quick Learner',
      description: 'Complete 5 lessons in a single day',
      icon: 'zap',
      unlockedAt: new Date('2023-10-18')
    },
    {
      id: 'ach_3',
      title: 'Consistent Coder',
      description: 'Maintain a 7-day streak',
      icon: 'calendar',
      unlockedAt: new Date('2023-10-25')
    }
  ],
  completedLessons: ['lesson_1', 'lesson_2', 'lesson_3', 'lesson_5', 'lesson_8'],
  currentPath: 'path_1',
  preferences: {
    learningSpeed: 'medium',
    preferredTopics: ['web-development', 'javascript', 'react'],
    difficultyPreference: 'standard',
    dailyGoal: 30,
    preferredLearningStyle: 'visual'
  }
};

// Mock learning paths
export const mockLearningPaths: LearningPath[] = [
  {
    id: 'path_1',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of web development with HTML, CSS, and JavaScript',
    icon: 'globe',
    level: 'beginner',
    ageRange: '12+',
    modules: [
      {
        id: 'module_1',
        title: 'HTML Basics',
        description: 'Learn the building blocks of web pages',
        icon: 'code',
        lessons: [
          {
            id: 'lesson_1',
            title: 'Introduction to HTML',
            description: 'Learn what HTML is and how it structures web content',
            type: 'video',
            duration: 10,
            xpReward: 50
          },
          {
            id: 'lesson_2',
            title: 'HTML Elements',
            description: 'Explore common HTML elements and their uses',
            type: 'interactive',
            duration: 15,
            xpReward: 75
          }
        ]
      },
      {
        id: 'module_2',
        title: 'CSS Styling',
        description: 'Make your web pages look great with CSS',
        icon: 'palette',
        lessons: [
          {
            id: 'lesson_3',
            title: 'CSS Selectors',
            description: 'Learn how to target HTML elements with CSS',
            type: 'video',
            duration: 12,
            xpReward: 60
          },
          {
            id: 'lesson_4',
            title: 'Box Model',
            description: 'Understand the CSS box model for layout',
            type: 'interactive',
            duration: 20,
            xpReward: 100
          }
        ]
      }
    ]
  },
  {
    id: 'path_2',
    title: 'Python Programming',
    description: 'Learn Python programming from scratch',
    icon: 'code',
    level: 'beginner',
    ageRange: '10+',
    modules: [
      {
        id: 'module_3',
        title: 'Python Basics',
        description: 'Get started with Python syntax and concepts',
        icon: 'terminal',
        lessons: [
          {
            id: 'lesson_5',
            title: 'Variables and Data Types',
            description: 'Learn about Python variables and basic data types',
            type: 'video',
            duration: 15,
            xpReward: 75
          },
          {
            id: 'lesson_6',
            title: 'Control Flow',
            description: 'Explore if statements and loops in Python',
            type: 'interactive',
            duration: 25,
            xpReward: 125
          }
        ]
      }
    ]
  },
  {
    id: 'path_3',
    title: 'Game Development',
    description: 'Create your own games with JavaScript',
    icon: 'gamepad',
    level: 'intermediate',
    ageRange: '12+',
    modules: [
      {
        id: 'module_4',
        title: 'Game Basics',
        description: 'Learn fundamental game development concepts',
        icon: 'square',
        lessons: [
          {
            id: 'lesson_7',
            title: 'Game Loop',
            description: 'Understand the core game loop pattern',
            type: 'video',
            duration: 20,
            xpReward: 100
          },
          {
            id: 'lesson_8',
            title: 'Simple Game Project',
            description: 'Build a simple game from scratch',
            type: 'project',
            duration: 45,
            xpReward: 250
          }
        ]
      }
    ]
  }
];

// Mock achievements
export const mockAchievements: Achievement[] = [
  {
    id: 'ach_1',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: 'trophy',
    unlockedAt: new Date('2023-10-15')
  },
  {
    id: 'ach_2',
    title: 'Quick Learner',
    description: 'Complete 5 lessons in a single day',
    icon: 'zap',
    unlockedAt: new Date('2023-10-18')
  },
  {
    id: 'ach_3',
    title: 'Consistent Coder',
    description: 'Maintain a 7-day streak',
    icon: 'calendar',
    unlockedAt: new Date('2023-10-25')
  },
  {
    id: 'ach_4',
    title: 'Code Explorer',
    description: 'Try all learning paths',
    icon: 'map',
  },
  {
    id: 'ach_5',
    title: 'Bug Hunter',
    description: 'Fix 10 code challenges',
    icon: 'bug',
  }
];

// Mock coding exercises
export const mockExercises: Exercise[] = [
  {
    id: 'ex_1',
    title: 'Hello World',
    description: 'Write your first program',
    instructions: 'Print "Hello, World!" to the console.',
    difficulty: 'easy',
    language: 'javascript',
    starterCode: '// Write your code here\n\n',
    solution: 'console.log("Hello, World!");',
    hints: ['Use console.log() to print to the console']
  },
  {
    id: 'ex_2',
    title: 'Sum of Two Numbers',
    description: 'Create a function that adds two numbers',
    instructions: 'Write a function that takes two numbers and returns their sum.',
    difficulty: 'easy',
    language: 'javascript',
    starterCode: 'function sum(a, b) {\n  // Write your code here\n}\n',
    solution: 'function sum(a, b) {\n  return a + b;\n}',
    hints: ['Use the + operator to add numbers', 'Don\'t forget to return the result']
  },
  {
    id: 'ex_3',
    title: 'Reverse a String',
    description: 'Create a function that reverses a string',
    instructions: 'Write a function that takes a string and returns it reversed.',
    difficulty: 'medium',
    language: 'javascript',
    starterCode: 'function reverseString(str) {\n  // Write your code here\n}\n',
    solution: 'function reverseString(str) {\n  return str.split("").reverse().join("");\n}',
    hints: ['You can split a string into an array of characters', 'Arrays have a reverse method', 'Join the array back into a string']
  }
];

// Mock daily challenges
export const mockDailyChallenges: DailyChallenge[] = [
  {
    id: 'dc_1',
    title: 'CSS Flexbox Challenge',
    description: 'Create a responsive layout using flexbox',
    difficulty: 'medium',
    type: 'code',
    xpReward: 150,
    timeLimit: 30,
    availableUntil: new Date(Date.now() + 86400000), // 24 hours from now
    completed: false
  },
  {
    id: 'dc_2',
    title: 'JavaScript Quiz',
    description: 'Test your JavaScript knowledge',
    difficulty: 'easy',
    type: 'quiz',
    xpReward: 100,
    timeLimit: 15,
    availableUntil: new Date(Date.now() + 86400000), // 24 hours from now
    completed: true
  }
];

// Mock study groups
export const mockStudyGroups: StudyGroup[] = [
  {
    id: 'group_1',
    name: 'Web Dev Beginners',
    description: 'A group for those just starting with web development',
    topic: 'Web Development',
    level: 'Beginner',
    members: [
      {
        id: 'member_1',
        user: mockUser,
        role: 'leader',
        joinedAt: new Date('2023-09-01')
      }
    ],
    resources: [
      {
        id: 'resource_1',
        title: 'HTML Cheat Sheet',
        type: 'pdf',
        url: 'https://example.com/html-cheatsheet.pdf',
        addedBy: 'user_1',
        addedAt: new Date('2023-09-05')
      }
    ],
    messages: [
      {
        id: 'msg_1',
        content: 'Welcome to the group everyone!',
        sender: mockUser,
        sentAt: new Date('2023-09-01')
      }
    ],
    createdAt: new Date('2023-09-01'),
    meetingTime: 'Thursdays at 7 PM',
    maxMembers: 10
  }
];

// Mock notifications
export const mockNotifications = [
  {
    id: 'notif_1',
    type: 'achievement',
    title: 'Achievement Unlocked!',
    message: 'You\'ve earned the "First Steps" achievement.',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  },
  {
    id: 'notif_2',
    type: 'streak',
    title: 'Streak Milestone!',
    message: 'You\'ve maintained a 7-day learning streak. Keep it up!',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: 'notif_3',
    type: 'challenge',
    title: 'New Daily Challenge',
    message: 'A new coding challenge is available. Earn bonus XP!',
    read: false,
    createdAt: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
  }
];

// Initialize mock data in browser's localStorage if it doesn't exist
export const initializeMockData = () => {
  try {
    // Make sure we're in a browser environment
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      console.warn('Browser localStorage not available, skipping mock data initialization');
      return;
    }
    
    // Initialize notifications
    if (!window.localStorage.getItem('yungs_tech_db_notifications')) {
      window.localStorage.setItem('yungs_tech_db_notifications', JSON.stringify(mockNotifications));
    }
    
    // Initialize users with the mock user
    if (!window.localStorage.getItem('yungs_tech_users')) {
      window.localStorage.setItem('yungs_tech_users', JSON.stringify([
        {
          id: mockUser.id,
          email: 'alex@example.com',
          username: mockUser.name,
          user_metadata: {
            username: mockUser.name,
            learning_speed: mockUser.preferences?.learningSpeed || 'medium',
            preferred_learning_style: mockUser.preferences?.preferredLearningStyle || 'visual',
            daily_goal: mockUser.preferences?.dailyGoal || 30
          }
        }
      ]));
    }
  
  // Initialize learning paths
    if (!window.localStorage.getItem('yungs_tech_db_learning_paths')) {
      window.localStorage.setItem('yungs_tech_db_learning_paths', JSON.stringify(mockLearningPaths));
    }
    
    // Initialize achievements
    if (!window.localStorage.getItem('yungs_tech_db_achievements')) {
      window.localStorage.setItem('yungs_tech_db_achievements', JSON.stringify(mockAchievements));
    }
    
    // Initialize exercises
    if (!window.localStorage.getItem('yungs_tech_db_exercises')) {
      window.localStorage.setItem('yungs_tech_db_exercises', JSON.stringify(mockExercises));
    }
    
    // Initialize daily challenges
    if (!window.localStorage.getItem('yungs_tech_db_daily_challenges')) {
      window.localStorage.setItem('yungs_tech_db_daily_challenges', JSON.stringify(mockDailyChallenges));
    }
    
    // Initialize study groups
    if (!window.localStorage.getItem('yungs_tech_db_study_groups')) {
      window.localStorage.setItem('yungs_tech_db_study_groups', JSON.stringify(mockStudyGroups));
    }
  } catch (e) {
    console.error('Error initializing mock data in localStorage', e);
  }
};