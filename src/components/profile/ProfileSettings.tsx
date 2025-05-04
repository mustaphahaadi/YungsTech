import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Settings, Clock, Brain, BookOpen, Save } from 'lucide-react';

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    learningSpeed: 'medium',
    preferredStyle: 'visual',
    dailyGoal: 30
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('users')
        .update({
          learning_speed: settings.learningSpeed,
          preferred_learning_style: settings.preferredStyle,
          daily_goal: settings.dailyGoal
        })
        .eq('id', user?.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5 text-indigo-500" />
        <h2 className="text-xl font-bold text-gray-800">Learning Preferences</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              Learning Speed
            </div>
          </label>
          <select
            value={settings.learningSpeed}
            onChange={(e) => setSettings({ ...settings, learningSpeed: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="slow">Slow & Thorough</option>
            <option value="medium">Balanced</option>
            <option value="fast">Fast-paced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-gray-500" />
              Preferred Learning Style
            </div>
          </label>
          <select
            value={settings.preferredStyle}
            onChange={(e) => setSettings({ ...settings, preferredStyle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="visual">Visual</option>
            <option value="practical">Practical</option>
            <option value="theoretical">Theoretical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              Daily Learning Goal (minutes)
            </div>
          </label>
          <input
            type="number"
            value={settings.dailyGoal}
            onChange={(e) => setSettings({ ...settings, dailyGoal: parseInt(e.target.value) })}
            min="15"
            max="180"
            step="15"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          icon={<Save className="h-4 w-4" />}
        >
          {loading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </form>
    </Card>
  );
};

export default ProfileSettings;