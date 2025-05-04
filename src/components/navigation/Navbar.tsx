import React from 'react';
import { Star, Trophy, User, BookOpen, Home, Menu, X, Users, Award, Code, UserPlus, Settings } from 'lucide-react';
import { mockUser } from '../../data/mockData';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  onNavChange: (nav: string) => void;
  currentNav: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavChange, currentNav }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { signOut } = useAuth();

  const navItems = [
    { name: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { name: 'paths', label: 'Learning Paths', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'progress', label: 'My Progress', icon: <Star className="w-5 h-5" /> },
    { name: 'achievements', label: 'Achievements', icon: <Trophy className="w-5 h-5" /> },
    { name: 'leaderboard', label: 'Leaderboard', icon: <Award className="w-5 h-5" /> },
    { name: 'community', label: 'Community', icon: <Users className="w-5 h-5" /> },
    { name: 'groups', label: 'Study Groups', icon: <UserPlus className="w-5 h-5" /> },
    { name: 'playground', label: 'Playground', icon: <Code className="w-5 h-5" /> }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    onNavChange('profile');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 text-white p-2 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-blue-600">YungsTech</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavChange(item.name)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                  currentNav === item.name
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center">
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100"
              >
                <Avatar 
                  src={mockUser.avatar} 
                  alt={mockUser.name}
                  size="sm"
                />
                <span className="font-medium">{mockUser.name}</span>
              </button>
              <button
                onClick={signOut}
                className="ml-2 text-gray-600 hover:text-gray-800"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-2">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onNavChange(item.name);
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-md flex items-center gap-2 transition-colors ${
                    currentNav === item.name
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                onClick={handleProfileClick}
                className="px-4 py-3 rounded-md flex items-center gap-2 text-gray-600 hover:bg-gray-100"
              >
                <User className="w-5 h-5" />
                <span>Profile & Settings</span>
              </button>
              <button
                onClick={signOut}
                className="px-4 py-3 rounded-md flex items-center gap-2 text-rose-600 hover:bg-rose-50"
              >
                <Settings className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;