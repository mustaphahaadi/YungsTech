import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, apiRequest, User as ApiUser } from '../lib/api';

// Define User type based on our API
interface User extends ApiUser {}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<User>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  updateUser: async () => {
    throw new Error('Not implemented');
  },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user on initial mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check if we have a token
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setLoading(false);
          return;
        }

        // Try to get current user
        const userData = await apiRequest(() => api.auth.getCurrentUser());
        setUser(userData);
      } catch (error) {
        // If there's an error, clear tokens
        console.error('Failed to load user:', error);
        api.auth.logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const signOut = async () => {
    api.auth.logout();
    setUser(null);
  };

  const updateUser = async (userData: Partial<User>): Promise<User> => {
    const updatedUser = await apiRequest(() => 
      api.auth.updateUserPreferences(userData)
    );
    setUser(updatedUser);
    return updatedUser;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};