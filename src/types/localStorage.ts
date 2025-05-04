// Type definitions for localStorage implementation

export interface User {
  id: string;
  email: string;
  username: string;
  user_metadata?: {
    username: string;
    learning_speed: string;
    preferred_learning_style: string;
    daily_goal: number;
  };
}

export interface Session {
  user: User | null;
}

export interface AuthResponse {
  data: {
    user: User | null;
  };
  error: Error | null;
}

export interface SessionResponse {
  data: {
    session: Session | null;
  };
}

export interface SubscriptionResponse {
  data: {
    subscription: {
      unsubscribe: () => void;
    };
  };
}

export interface Error {
  message: string;
}