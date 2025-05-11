import React, { useState } from 'react';
import { api } from '../../lib/api';
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
  const [learningSpeed, setLearningSpeed] = useState('medium');
  const [learningStyle, setLearningStyle] = useState('visual');
  const [dailyGoal, setDailyGoal] = useState(30);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.auth.register({
        username,
        email,
        password,
        learning_speed: learningSpeed,
        preferred_learning_style: learningStyle,
        daily_goal: dailyGoal
      });
      
      // After registration, log the user in
      await api.auth.login(email, password);
      onSuccess?.();
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
        
        <div>
          <label htmlFor="learningSpeed" className="block text-sm font-medium text-gray-700 mb-1">
            Learning Speed
          </label>
          <select
            id="learningSpeed"
            value={learningSpeed}
            onChange={(e) => setLearningSpeed(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="slow">Slow</option>
            <option value="medium">Medium</option>
            <option value="fast">Fast</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="learningStyle" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Learning Style
          </label>
          <select
            id="learningStyle"
            value={learningStyle}
            onChange={(e) => setLearningStyle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="visual">Visual</option>
            <option value="practical">Practical</option>
            <option value="theoretical">Theoretical</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="dailyGoal" className="block text-sm font-medium text-gray-700 mb-1">
            Daily Goal (minutes)
          </label>
          <input
            id="dailyGoal"
            type="number"
            min="5"
            max="240"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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