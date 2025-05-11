import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Code,
  UserCircle,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import Badge from '../ui/Badge';

interface NavbarProps {
  currentNav: string;
  onNavChange: (nav: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentNav, onNavChange }) => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'paths', label: 'Learning Paths', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'achievements', label: 'Achievements', icon: <Award className="w-5 h-5" /> },
    { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Users className="w-5 h-5" /> },
    { id: 'community', label: 'Community', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'playground', label: 'Playground', icon: <Code className="w-5 h-5" /> },
    { id: 'groups', label: 'Study Groups', icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">YungsTech</span>
            </div>
            
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => onNavChange(item.id)}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    currentNav === item.id
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* User menu */}
          <div className="hidden md:flex md:items-center">
            <div className="flex items-center">
              <Badge color="indigo" className="mr-3">Level {user?.level || 1}</Badge>
              
              <button
                onClick={() => onNavChange('profile')}
                className={`flex items-center text-sm font-medium rounded-md px-3 py-2 ${
                  currentNav === 'profile'
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <UserCircle className="w-5 h-5 mr-1" />
                {user?.username || 'Profile'}
              </button>
              
              <button
                onClick={handleSignOut}
                className="ml-2 text-gray-500 hover:text-gray-700 p-2"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-base font-medium ${
                  currentNav === item.id
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </div>
              </button>
            ))}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <UserCircle className="w-10 h-10 text-gray-400" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.username}</div>
                <div className="text-sm font-medium text-gray-500">{user?.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={() => {
                  onNavChange('profile');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
              >
                Your Profile
              </button>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;