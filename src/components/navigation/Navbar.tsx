import React from 'react';
import { Star, Trophy, User, BookOpen, Home, Menu, X, Users, Award, Code, UserPlus, Settings, ChevronDown, Layers } from 'lucide-react';
import { mockUser } from '../../data/mockData';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  onNavChange: (nav: string) => void;
  currentNav: string;
}

interface NavItem {
  name: string;
  label: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ onNavChange, currentNav }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const { signOut } = useAuth();

  const navItems: NavItem[] = [
    { name: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { 
      name: 'learning', 
      label: 'Learning', 
      icon: <BookOpen className="w-5 h-5" />,
      children: [
        { name: 'paths', label: 'Learning Paths', icon: <Layers className="w-5 h-5" /> },
        { name: 'progress', label: 'My Progress', icon: <Star className="w-5 h-5" /> },
        { name: 'playground', label: 'Playground', icon: <Code className="w-5 h-5" /> }
      ]
    },
    { 
      name: 'community', 
      label: 'Community', 
      icon: <Users className="w-5 h-5" />,
      children: [
        { name: 'groups', label: 'Study Groups', icon: <UserPlus className="w-5 h-5" /> },
        { name: 'leaderboard', label: 'Leaderboard', icon: <Award className="w-5 h-5" /> }
      ]
    },
    { 
      name: 'achievements', 
      label: 'Achievements', 
      icon: <Trophy className="w-5 h-5" /> 
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close any open dropdowns when toggling the menu
    setOpenDropdown(null);
  };
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              <div key={item.name} className="relative">
                {item.children ? (
                  <div className="relative dropdown-container">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                        currentNav.startsWith(item.name) || item.children?.some(child => child.name === currentNav)
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {openDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg py-1 z-50 min-w-[180px]">
                        {item.children.map((child) => (
                          <button
                            key={child.name}
                            onClick={() => {
                              onNavChange(child.name);
                              setOpenDropdown(null);
                            }}
                            className={`w-full text-left px-4 py-2 flex items-center gap-2 transition-colors ${
                              currentNav === child.name
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {child.icon}
                            <span>{child.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
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
                )}
              </div>
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
                <React.Fragment key={item.name}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className={`px-4 py-3 rounded-md flex items-center justify-between transition-colors dropdown-container ${
                          currentNav.startsWith(item.name) || item.children?.some(child => child.name === currentNav)
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {openDropdown === item.name && (
                        <div className="pl-6 space-y-1 mt-1 border-l-2 border-gray-200 ml-4">
                          {item.children.map((child) => (
                            <button
                              key={child.name}
                              onClick={() => {
                                onNavChange(child.name);
                                setIsMenuOpen(false);
                              }}
                              className={`px-4 py-2 rounded-md flex items-center gap-2 w-full transition-colors ${
                                currentNav === child.name
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              {child.icon}
                              <span>{child.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
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
                  )}
                </React.Fragment>
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