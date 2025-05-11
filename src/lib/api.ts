// API service for connecting to the Django backend

const API_URL = 'http://localhost:8000/api';

// Types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  level: number;
  xp: number;
  learning_speed: 'slow' | 'medium' | 'fast';
  preferred_learning_style: 'visual' | 'practical' | 'theoretical';
  daily_goal: number;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  age_range: string;
  created_at: string;
  updated_at: string;
  modules: Module[];
}

export interface Module {
  id: string;
  learning_path: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  module: string;
  title: string;
  description: string;
  type: 'video' | 'interactive' | 'quiz' | 'project';
  content: any;
  duration: number;
  xp_reward: number;
  difficulty: number;
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: any;
  xp_reward: number;
}

export interface UserAchievement {
  id: string;
  user: string;
  achievement: Achievement;
  unlocked_at: string;
}

export interface Streak {
  id: string;
  user: string;
  current: number;
  longest: number;
  last_activity_date: string;
  protection_available: boolean;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'quiz' | 'code' | 'reading' | 'practice';
  content: any;
  xp_reward: number;
  available_until: string;
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `API error: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

// Get the stored auth token
function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

// Create headers with auth token if available
function createHeaders(includeAuth: boolean = true): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

// API functions
export const api = {
  // Auth
  auth: {
    login: async (email: string, password: string): Promise<AuthResponse> => {
      const response = await fetch(`${API_URL}/users/token/`, {
        method: 'POST',
        headers: createHeaders(false),
        body: JSON.stringify({ email, password }),
      });
      
      const data = await handleResponse<AuthResponse>(response);
      localStorage.setItem('auth_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      return data;
    },
    
    register: async (userData: {
      username: string;
      email: string;
      password: string;
      learning_speed?: string;
      preferred_learning_style?: string;
      daily_goal?: number;
    }): Promise<User> => {
      const response = await fetch(`${API_URL}/users/register/`, {
        method: 'POST',
        headers: createHeaders(false),
        body: JSON.stringify(userData),
      });
      
      return handleResponse<User>(response);
    },
    
    refreshToken: async (): Promise<{ access: string }> => {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) throw new Error('No refresh token available');
      
      const response = await fetch(`${API_URL}/users/token/refresh/`, {
        method: 'POST',
        headers: createHeaders(false),
        body: JSON.stringify({ refresh: refreshToken }),
      });
      
      const data = await handleResponse<{ access: string }>(response);
      localStorage.setItem('auth_token', data.access);
      return data;
    },
    
    getCurrentUser: async (): Promise<User> => {
      const response = await fetch(`${API_URL}/users/me/`, {
        headers: createHeaders(),
      });
      
      return handleResponse<User>(response);
    },
    
    updateUserPreferences: async (preferences: Partial<User>): Promise<User> => {
      const response = await fetch(`${API_URL}/users/me/`, {
        method: 'PATCH',
        headers: createHeaders(),
        body: JSON.stringify(preferences),
      });
      
      return handleResponse<User>(response);
    },
    
    logout: (): void => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
    },
  },
  
  // Learning
  learning: {
    getPaths: async (): Promise<LearningPath[]> => {
      const response = await fetch(`${API_URL}/learning/paths/`, {
        headers: createHeaders(),
      });
      
      return handleResponse<LearningPath[]>(response);
    },
    
    getPathById: async (id: string): Promise<LearningPath> => {
      const response = await fetch(`${API_URL}/learning/paths/${id}/`, {
        headers: createHeaders(),
      });
      
      return handleResponse<LearningPath>(response);
    },
    
    getPathProgress: async (id: string): Promise<{
      total_lessons: number;
      completed_lessons: number;
      completion_percentage: number;
    }> => {
      const response = await fetch(`${API_URL}/learning/paths/${id}/progress/`, {
        headers: createHeaders(),
      });
      
      return handleResponse<{
        total_lessons: number;
        completed_lessons: number;
        completion_percentage: number;
      }>(response);
    },
    
    completeLesson: async (
      lessonId: string, 
      data: { score?: number; time_spent?: number }
    ): Promise<{ status: string; xp_gained?: number }> => {
      const response = await fetch(`${API_URL}/learning/lessons/${lessonId}/complete/`, {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify(data),
      });
      
      return handleResponse<{ status: string; xp_gained?: number }>(response);
    },
  },
  
  // Gamification
  gamification: {
    getAchievements: async (): Promise<Achievement[]> => {
      const response = await fetch(`${API_URL}/gamification/achievements/`, {
        headers: createHeaders(),
      });
      
      return handleResponse<Achievement[]>(response);
    },
    
    getUserAchievements: async (): Promise<UserAchievement[]> => {
      const response = await fetch(`${API_URL}/gamification/achievements/user/`, {
        headers: createHeaders(),
      });
      
      return handleResponse<UserAchievement[]>(response);
    },
    
    checkInStreak: async (): Promise<Streak> => {
      const response = await fetch(`${API_URL}/gamification/streak/check-in/`, {
        method: 'POST',
        headers: createHeaders(),
      });
      
      return handleResponse<Streak>(response);
    },
    
    getDailyChallenges: async (): Promise<DailyChallenge[]> => {
      const response = await fetch(`${API_URL}/gamification/challenges/`, {
        headers: createHeaders(),
      });
      
      return handleResponse<DailyChallenge[]>(response);
    },
    
    completeChallenge: async (
      challengeId: string
    ): Promise<{ status: string; xp_gained: number }> => {
      const response = await fetch(`${API_URL}/gamification/challenges/${challengeId}/complete/`, {
        method: 'POST',
        headers: createHeaders(),
      });
      
      return handleResponse<{ status: string; xp_gained: number }>(response);
    },
  },
};

// Interceptor for handling token refresh
export async function apiRequest<T>(
  requestFn: () => Promise<T>
): Promise<T> {
  try {
    return await requestFn();
  } catch (error: any) {
    // If unauthorized and we have a refresh token, try to refresh
    if (error.message.includes('401') && localStorage.getItem('refresh_token')) {
      try {
        await api.auth.refreshToken();
        // Retry the original request
        return await requestFn();
      } catch (refreshError) {
        // If refresh fails, logout and throw error
        api.auth.logout();
        throw new Error('Session expired. Please login again.');
      }
    }
    throw error;
  }
}