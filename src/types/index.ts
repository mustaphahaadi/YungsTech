export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  achievements: Achievement[];
  completedLessons: string[];
  currentPath: string;
  preferences?: LearningPreferences;
  progress?: PersonalizedProgress;
}

export interface LearningPreferences {
  learningSpeed: 'slow' | 'medium' | 'fast';
  preferredTopics: string[];
  difficultyPreference: 'easier' | 'standard' | 'challenging';
  dailyGoal: number; // minutes
  preferredLearningStyle: 'visual' | 'practical' | 'theoretical';
}

export interface PersonalizedProgress {
  topicStrengths: { [key: string]: number }; // 0-100 score for each topic
  learningVelocity: number; // average lessons completed per week
  consistencyScore: number; // 0-100 based on regular engagement
  adaptiveDifficulty: number; // current difficulty multiplier
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  ageRange: string;
  modules: Module[];
  prerequisites?: string[];
  recommendationScore?: number;
  adaptiveDifficulty?: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'interactive' | 'quiz' | 'project';
  duration: number;
  xpReward: number;
  difficulty?: number;
  prerequisites?: string[];
  adaptiveContent?: AdaptiveContent;
}

export interface AdaptiveContent {
  baseContent: string;
  variations: {
    difficulty: 'easier' | 'standard' | 'challenging';
    content: string;
  }[];
  hints: string[];
  extraResources: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  instructions: string;
  difficulty: string;
  language: string;
  starterCode: string;
  solution: string;
  hints: string[];
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'quiz' | 'code' | 'reading' | 'practice';
  xpReward: number;
  timeLimit: number;
  availableUntil: Date;
  completed?: boolean;
}

export interface SkillTreeNode {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: number;
  xpRequired: number;
  children: string[];
  prerequisites: string[];
  unlocked: boolean;
  completed: boolean;
  abilities?: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  progress: number;
  maxProgress: number;
  unlockedAt?: Date;
  hidden?: boolean;
}

export interface Streak {
  current: number;
  longest: number;
  lastLoginDate: Date;
  protectionAvailable: boolean;
  weeklyStreak: number;
  monthlyStreak: number;
}

export interface UserProgress {
  userId: string;
  level: number;
  xp: number;
  totalXp: number;
  xpToNextLevel: number;
  streak: Streak;
  badges: Badge[];
  skillTrees: { [key: string]: SkillTreeNode[] };
  completedChallenges: string[];
  multiplier: number;
  rank?: number;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  topic: string;
  level: string;
  members: GroupMember[];
  resources: GroupResource[];
  messages: GroupMessage[];
  createdAt: Date;
  meetingTime?: string;
  maxMembers: number;
}

export interface GroupMember {
  id: string;
  user: User;
  role: 'leader' | 'moderator' | 'member';
  joinedAt: Date;
}

export interface GroupResource {
  id: string;
  title: string;
  type: string;
  url: string;
  addedBy: string;
  addedAt: Date;
}

export interface GroupMessage {
  id: string;
  content: string;
  sender: User;
  sentAt: Date;
  attachments?: string[];
}