import React, { useState, useEffect } from 'react';
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
  LogOut,
  ChevronDown,
  Layers,
  Zap,
  Settings,
  Bell,
  Search,
  HelpCircle,
  Bookmark,
  Calendar,
  BarChart2,
  Moon,
  Sun
} from 'lucide-react';
import Badge from '../ui/Badge';
import { Link } from 'react-router-dom';

interface NavbarProps {
  currentNav: string;
  onNavChange: (nav: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: NavItem[];
  badge?: string;
  badgeColor?: 'green' | 'yellow' | 'red' | 'blue' | 'indigo';
}

const Navbar: React.FC<NavbarProps> = ({ currentNav, onNavChange }) => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, you would apply dark mode to the entire app here
    document.documentElement.classList.toggle('dark-mode');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
    setShowSearch(false);
  };

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { 
      id: 'learn', 
      label: 'Learn', 
      icon: <BookOpen className="w-5 h-5" />,
      children: [
        { id: 'paths', label: 'Learning Paths', icon: <Layers className="w-5 h-5" /> },
        { id: 'progress', label: 'My Progress', icon: <TrendingUp className="w-5 h-5" /> },
        { id: 'playground', label: 'Code Playground', icon: <Code className="w-5 h-5" /> },
        { id: 'bookmarks', label: 'Saved Lessons', icon: <Bookmark className="w-5 h-5" /> },
      ]
    },
    { 
      id: 'community', 
      label: 'Community', 
      icon: <Users className="w-5 h-5" />,
      children: [
        { id: 'groups', label: 'Study Groups', icon: <Users className="w-5 h-5" /> },
        { id: 'leaderboard', label: 'Leaderboard', icon: <BarChart2 className="w-5 h-5" /> },
        { id: 'forum', label: 'Discussion Forum', icon: <MessageSquare className="w-5 h-5" /> },
        { id: 'events', label: 'Live Events', icon: <Calendar className="w-5 h-5" />, badge: 'New', badgeColor: 'green' },
      ]
    },
    { 
      id: 'gamification', 
      label: 'Rewards', 
      icon: <Zap className="w-5 h-5" />,
      children: [
        { id: 'achievements', label: 'Achievements', icon: <Award className="w-5 h-5" /> },
        { id: 'challenges', label: 'Daily Challenges', icon: <Zap className="w-5 h-5" />, badge: '2', badgeColor: 'yellow' },
      ]
    },
    { id: 'help', label: 'Help', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const renderNavItem = (item: NavItem) => {
    const isActive = currentNav === item.id || 
      (item.children?.some(child => child.id === currentNav));
    const hasChildren = item.children && item.children.length > 0;
    
    return (
      <div key={item.id} className="relative">
        <button
          onClick={() => hasChildren ? toggleDropdown(item.id) : onNavChange(item.id)}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
            isActive
              ? 'text-indigo-600 bg-indigo-50'
              : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
          }`}
        >
          <span className="mr-2">{item.icon}</span>
          {item.label}
          {item.badge && (
            <Badge color={item.badgeColor || 'indigo'} className="ml-2">
              {item.badge}
            </Badge>
          )}
          {hasChildren && (
            <ChevronDown 
              className={`ml-1 w-4 h-4 transition-transform ${openDropdown === item.id ? 'transform rotate-180' : ''}`} 
            />
          )}
        </button>
        
        {hasChildren && openDropdown === item.id && (
          <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {item.children.map(child => (
                <button
                  key={child.id}
                  onClick={() => {
                    onNavChange(child.id);
                    setOpenDropdown(null);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    currentNav === child.id
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2">{child.icon}</span>
                      {child.label}
                    </div>
                    {child.badge && (
                      <Badge color={child.badgeColor || 'indigo'}>
                        {child.badge}
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMobileNavItem = (item: NavItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = currentNav === item.id || 
      (item.children?.some(child => child.id === currentNav));
    
    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleDropdown(item.id);
            } else {
              onNavChange(item.id);
              setMobileMenuOpen(false);
            }
          }}
          className={`block w-full text-left px-3 py-2 text-base font-medium ${
            isActive
              ? 'text-indigo-600 bg-indigo-50'
              : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
          }`}
          style={{ paddingLeft: `${depth * 1 + 0.75}rem` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3">{item.icon}</span>
              {item.label}
              {item.badge && (
                <Badge color={item.badgeColor || 'indigo'} className="ml-2">
                  {item.badge}
                </Badge>
              )}
            </div>
            {hasChildren && (
              <ChevronDown 
                className={`ml-1 w-4 h-4 transition-transform ${openDropdown === item.id ? 'transform rotate-180' : ''}`} 
              />
            )}
          </div>
        </button>
        
        {hasChildren && openDropdown === item.id && (
          <div className="pl-4">
            {item.children.map(child => renderMobileNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`bg-white fixed w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">YungsTech</span>
            </div>
          </div>
          
          {/* Center navigation */}
          <div className="hidden md:flex md:items-center md:justify-center flex-1 px-2">
            <div className="flex space-x-1">
              {navItems.map(item => renderNavItem(item))}
            </div>
          </div>
          
          {/* Right side - User menu, notifications, etc. */}
          <div className="hidden md:flex md:items-center space-x-3">
            {/* Search button */}
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Dark mode toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('notifications')}
                className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              {openDropdown === 'notifications' && (
                <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-2 px-4 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                      <button className="text-xs text-indigo-600 hover:text-indigo-800">Mark all as read</button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="py-2 px-4 bg-indigo-50 border-l-4 border-indigo-500">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">New achievement unlocked!</p>
                        <span className="text-xs text-gray-500">2m ago</span>
                      </div>
                      <p className="text-sm text-gray-600">You've earned the "First Steps" badge.</p>
                    </div>
                    <div className="py-2 px-4">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">Daily challenge available</p>
                        <span className="text-xs text-gray-500">1h ago</span>
                      </div>
                      <p className="text-sm text-gray-600">Complete today's coding challenge.</p>
                    </div>
                    <div className="py-2 px-4">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">Study group invitation</p>
                        <span className="text-xs text-gray-500">3h ago</span>
                      </div>
                      <p className="text-sm text-gray-600">You've been invited to join "Python Pros".</p>
                    </div>
                  </div>
                  <div className="py-2 px-4 border-t border-gray-100 text-center">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
            
            {/* User menu */}
            <div className="relative">
              <div className="flex items-center">
                <Badge color="indigo" className="mr-2">Level {user?.level || 1}</Badge>
                
                <button
                  onClick={() => toggleDropdown('user-menu')}
                  className={`flex items-center text-sm font-medium rounded-md px-3 py-2 ${
                    currentNav === 'profile' || openDropdown === 'user-menu'
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.username} 
                      className="w-8 h-8 rounded-full object-cover border-2 border-indigo-200 mr-2"
                    />
                  ) : (
                    <UserCircle className="w-5 h-5 mr-2" />
                  )}
                  {user?.username || 'Profile'}
                  <ChevronDown 
                    className={`ml-1 w-4 h-4 transition-transform ${openDropdown === 'user-menu' ? 'transform rotate-180' : ''}`} 
                  />
                </button>
              </div>
              
              {openDropdown === 'user-menu' && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        onNavChange('profile');
                        setOpenDropdown(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        <UserCircle className="w-4 h-4 mr-2" />
                        Your Profile
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        onNavChange('settings');
                        setOpenDropdown(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </div>
                    </button>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </div>
                    </button>
                  </div>
                </div>
              )}
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
      
      {/* Search overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-16">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="p-4">
              <div className="flex items-center border-b border-gray-300 pb-2">
                <Search className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search for courses, topics, or content..."
                  className="flex-1 outline-none text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">POPULAR SEARCHES</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('Python')}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                  >
                    Python
                  </button>
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('JavaScript')}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                  >
                    JavaScript
                  </button>
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('React')}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                  >
                    React
                  </button>
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('Machine Learning')}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                  >
                    Machine Learning
                  </button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl overflow-y-auto">
            <div className="px-4 pt-5 pb-2 flex justify-between items-center border-b border-gray-200">
              <span className="text-lg font-medium text-indigo-600">YungsTech</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Mobile search */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="pt-2 pb-3 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
              {navItems.map(item => renderMobileNavItem(item))}
            </div>
            
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.username} 
                      className="h-10 w-10 rounded-full object-cover border-2 border-indigo-200"
                    />
                  ) : (
                    <UserCircle className="h-10 w-10 text-gray-400" />
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.username}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
                <Badge color="indigo" className="ml-auto">Level {user?.level || 1}</Badge>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={() => {
                    onNavChange('profile');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <UserCircle className="w-5 h-5 mr-3" />
                    Your Profile
                  </div>
                </button>
                <button
                  onClick={() => {
                    onNavChange('settings');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                  </div>
                </button>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign out
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;