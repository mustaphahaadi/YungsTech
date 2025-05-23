import React, { useState } from 'react';
import { api } from '../../lib/api';
import Button from '../ui/Button';
import { LogIn } from 'lucide-react';

interface SignInFormProps {
  onSuccess?: () => void;
  onSignUpClick: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSuccess, onSignUpClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Submitting login form with username:', username);
      await api.auth.login(username, password);
      console.log('Login successful');
      onSuccess?.();
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {error && (
          <div className="text-rose-500 text-sm">{error}</div>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
          icon={<LogIn className="h-4 w-4" />}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            type="button"
            onClick={onSignUpClick}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;