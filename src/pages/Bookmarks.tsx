import React, { useState } from 'react';
import { Bookmark, Folder, Search, Tag, Clock, ExternalLink, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';

interface BookmarkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'tutorial';
  tags: string[];
  folder: string;
  dateAdded: string;
}

const Bookmarks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  const bookmarks: BookmarkItem[] = [
    {
      id: '1',
      title: 'Introduction to React Hooks',
      description: 'Learn how to use React Hooks to simplify your components and manage state.',
      url: 'https://example.com/react-hooks',
      type: 'article',
      tags: ['react', 'javascript', 'frontend'],
      folder: 'React',
      dateAdded: '2023-10-15'
    },
    {
      id: '2',
      title: 'Building RESTful APIs with Node.js',
      description: 'A comprehensive guide to building RESTful APIs using Node.js and Express.',
      url: 'https://example.com/nodejs-apis',
      type: 'tutorial',
      tags: ['nodejs', 'api', 'backend'],
      folder: 'Node.js',
      dateAdded: '2023-10-20'
    },
    {
      id: '3',
      title: 'CSS Grid Layout Tutorial',
      description: 'Master CSS Grid Layout with this step-by-step tutorial.',
      url: 'https://example.com/css-grid',
      type: 'video',
      tags: ['css', 'frontend', 'layout'],
      folder: 'CSS',
      dateAdded: '2023-10-25'
    },
    {
      id: '4',
      title: 'Python Data Science Fundamentals',
      description: 'Learn the basics of data science using Python, NumPy, and Pandas.',
      url: 'https://example.com/python-data-science',
      type: 'course',
      tags: ['python', 'data-science', 'machine-learning'],
      folder: 'Python',
      dateAdded: '2023-11-01'
    },
    {
      id: '5',
      title: 'Docker for Beginners',
      description: 'Get started with Docker containers and containerization.',
      url: 'https://example.com/docker-beginners',
      type: 'tutorial',
      tags: ['docker', 'devops', 'containers'],
      folder: 'DevOps',
      dateAdded: '2023-11-05'
    },
    {
      id: '6',
      title: 'TypeScript Advanced Types',
      description: 'Deep dive into TypeScript advanced types and type manipulation.',
      url: 'https://example.com/typescript-advanced',
      type: 'article',
      tags: ['typescript', 'javascript', 'frontend'],
      folder: 'TypeScript',
      dateAdded: '2023-11-10'
    }
  ];
  
  // Extract unique folders and tags
  const folders = Array.from(new Set(bookmarks.map(bookmark => bookmark.folder)));
  const tags = Array.from(new Set(bookmarks.flatMap(bookmark => bookmark.tags)));
  
  // Filter bookmarks based on search, folder, and tag
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = searchQuery === '' || 
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFolder = activeFolder === null || bookmark.folder === activeFolder;
    const matchesTag = activeTag === null || bookmark.tags.includes(activeTag);
    
    return matchesSearch && matchesFolder && matchesTag;
  });
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'article':
        return 'bg-blue-100 text-blue-800';
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'course':
        return 'bg-green-100 text-green-800';
      case 'tutorial':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Lessons</h1>
        <p className="text-gray-600">
          Access your bookmarked lessons, articles, and tutorials.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search bookmarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Folders</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveFolder(null)}
                  className={`flex items-center w-full px-2 py-1.5 text-sm rounded-md ${
                    activeFolder === null
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Folder className="w-4 h-4 mr-2" />
                  All Folders
                </button>
                {folders.map(folder => (
                  <button
                    key={folder}
                    onClick={() => setActiveFolder(folder)}
                    className={`flex items-center w-full px-2 py-1.5 text-sm rounded-md ${
                      activeFolder === folder
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Folder className="w-4 h-4 mr-2" />
                    {folder}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                      activeTag === tag
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          {filteredBookmarks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No bookmarks found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery 
                  ? `No results found for "${searchQuery}"`
                  : activeFolder || activeTag
                    ? 'No bookmarks match the selected filters'
                    : 'You haven\'t saved any lessons yet'}
              </p>
              {(searchQuery || activeFolder || activeTag) && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFolder(null);
                    setActiveTag(null);
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookmarks.map(bookmark => (
                <div 
                  key={bookmark.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(bookmark.type)}`}>
                            {bookmark.type.charAt(0).toUpperCase() + bookmark.type.slice(1)}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            {bookmark.folder}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{bookmark.title}</h3>
                        <p className="text-gray-600 mb-4">{bookmark.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {bookmark.tags.map(tag => (
                            <span 
                              key={tag}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Saved on {formatDate(bookmark.dateAdded)}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 flex space-x-2">
                        <Button 
                          variant="outline"
                          icon={<Trash2 className="w-4 h-4" />}
                        >
                          Remove
                        </Button>
                        <Button 
                          variant="primary"
                          icon={<ExternalLink className="w-4 h-4" />}
                        >
                          Open
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;