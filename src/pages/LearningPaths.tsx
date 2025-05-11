import React, { useState } from 'react';
import { Book, Clock, Users, Star, ChevronRight, Filter, Search } from 'lucide-react';
import Button from '../components/ui/Button';

interface LearningPathProps {
  selectedPathId?: string | null;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  modules: number;
  students: number;
  rating: number;
  image: string;
  tags: string[];
}

const LearningPaths: React.FC<LearningPathProps> = ({ selectedPathId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'Web Development Fundamentals',
      description: 'Learn the basics of HTML, CSS, and JavaScript to build responsive websites.',
      level: 'beginner',
      duration: 20,
      modules: 5,
      students: 1245,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['html', 'css', 'javascript', 'responsive']
    },
    {
      id: '2',
      title: 'React.js for Beginners',
      description: 'Master React.js and build modern, interactive web applications.',
      level: 'intermediate',
      duration: 25,
      modules: 6,
      students: 987,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['react', 'javascript', 'frontend', 'hooks']
    },
    {
      id: '3',
      title: 'Python Data Science',
      description: 'Learn Python for data analysis, visualization, and machine learning.',
      level: 'intermediate',
      duration: 30,
      modules: 8,
      students: 1532,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['python', 'data-science', 'machine-learning', 'pandas']
    },
    {
      id: '4',
      title: 'Full-Stack Development with MERN',
      description: 'Build full-stack applications with MongoDB, Express, React, and Node.js.',
      level: 'advanced',
      duration: 40,
      modules: 10,
      students: 756,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['mongodb', 'express', 'react', 'nodejs', 'full-stack']
    },
    {
      id: '5',
      title: 'Mobile App Development with Flutter',
      description: 'Create beautiful, natively compiled mobile applications for iOS and Android.',
      level: 'intermediate',
      duration: 28,
      modules: 7,
      students: 892,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['flutter', 'dart', 'mobile', 'ios', 'android']
    },
    {
      id: '6',
      title: 'DevOps and Cloud Computing',
      description: 'Learn DevOps practices and cloud computing with AWS, Docker, and Kubernetes.',
      level: 'advanced',
      duration: 35,
      modules: 9,
      students: 645,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['devops', 'aws', 'docker', 'kubernetes', 'cloud']
    }
  ];
  
  // Filter learning paths based on search and level
  const filteredPaths = learningPaths.filter(path => {
    const matchesSearch = searchQuery === '' || 
      path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLevel = levelFilter === null || path.level === levelFilter;
    
    return matchesSearch && matchesLevel;
  });
  
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <HalfStar key="half" className="w-4 h-4 text-yellow-400" />
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }
    
    return stars;
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Paths</h1>
        <p className="text-gray-600">
          Explore structured learning paths to master new skills and technologies.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search learning paths..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter by level
            </button>
            
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setLevelFilter(null);
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${levelFilter === null ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    All Levels
                  </button>
                  <button
                    onClick={() => {
                      setLevelFilter('beginner');
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${levelFilter === 'beginner' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Beginner
                  </button>
                  <button
                    onClick={() => {
                      setLevelFilter('intermediate');
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${levelFilter === 'intermediate' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Intermediate
                  </button>
                  <button
                    onClick={() => {
                      setLevelFilter('advanced');
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${levelFilter === 'advanced' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Advanced
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <Button variant="primary">
            Browse All
          </Button>
        </div>
      </div>
      
      {levelFilter && (
        <div className="mb-6 bg-indigo-50 border border-indigo-100 rounded-md p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-indigo-700">Filtered by: </span>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(levelFilter)}`}>
              {levelFilter.charAt(0).toUpperCase() + levelFilter.slice(1)}
            </span>
          </div>
          <button
            onClick={() => setLevelFilter(null)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Clear filter
          </button>
        </div>
      )}
      
      {filteredPaths.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No learning paths found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? `No results found for "${searchQuery}"`
              : 'No learning paths match the selected filter'}
          </p>
          {(searchQuery || levelFilter) && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setLevelFilter(null);
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map(path => (
            <div 
              key={path.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col ${
                selectedPathId === path.id ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={path.image} 
                  alt={path.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(path.level)}`}>
                    {path.level.charAt(0).toUpperCase() + path.level.slice(1)}
                  </span>
                  <div className="flex items-center">
                    {renderStars(path.rating)}
                    <span className="ml-1 text-sm text-gray-600">{path.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{path.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{path.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {path.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                  {path.tags.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      +{path.tags.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Book className="w-4 h-4 mr-1" />
                    <span>{path.modules} modules</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{path.duration} hours</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{path.students.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Button 
                  variant="primary" 
                  fullWidth
                  icon={<ChevronRight className="w-4 h-4" />}
                >
                  View Path
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper component for half star
const HalfStar: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="half-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="50%" stopColor="none" stopOpacity="0" />
      </linearGradient>
    </defs>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#half-star-gradient)" stroke="#FCD34D" />
  </svg>
);

export default LearningPaths;