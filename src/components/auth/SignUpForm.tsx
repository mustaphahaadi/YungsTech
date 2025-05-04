import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';
import { UserPlus } from 'lucide-react';

interface SignUpFormProps {
  onSuccess?: () => void;
  onSignInClick: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess, onSignInClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            learning_speed: 'medium',
            preferred_learning_style: 'visual',
            daily_goal: 30
          }
        }
      });

      if (error) throw error;
      if (data.user) {
        onSuccess?.();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Account</h2>
      
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            minLength={6}
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
          icon={<UserPlus className="h-4 w-4" />}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </Button>

        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <button
            type="button"
            onClick={onSignInClick}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;