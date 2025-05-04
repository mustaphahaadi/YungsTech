import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserProfile from '../components/dashboard/UserProfile';
import ProfileSettings from '../components/profile/ProfileSettings';
import NotificationCenter from '../components/notifications/NotificationCenter';
import { mockUser } from '../lib/mockData';
import { User } from 'lucide-react';

const Profile: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <User className="mr-2 h-6 w-6 text-indigo-500" />
          Profile & Settings
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <UserProfile user={mockUser} />
          <ProfileSettings />
        </div>
        
        <div className="space-y-6">
          <NotificationCenter />
        </div>
      </div>
    </div>
  );
};

export default Profile;