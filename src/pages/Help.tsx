import React, { useState } from 'react';
import { Search, ChevronDown, MessageCircle, Book, Video, FileText, HelpCircle } from 'lucide-react';
import Button from '../components/ui/Button';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);
  
  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page. You will receive an email with instructions to create a new password.',
      category: 'Account'
    },
    {
      id: '2',
      question: 'How do I track my progress?',
      answer: 'You can track your progress by visiting the "Progress" page from the main navigation. This page shows your completed lessons, current streak, and overall learning statistics.',
      category: 'Learning'
    },
    {
      id: '3',
      question: 'How do I join a study group?',
      answer: 'To join a study group, navigate to the "Community" section and select "Study Groups". Browse available groups or search for a specific topic, then click the "Join Group" button.',
      category: 'Community'
    },
    {
      id: '4',
      question: 'How do I earn achievements?',
      answer: 'Achievements are earned by completing specific tasks or reaching milestones in your learning journey. Visit the "Achievements" page to see all available achievements and your progress towards earning them.',
      category: 'Gamification'
    },
    {
      id: '5',
      question: 'Can I download lessons for offline viewing?',
      answer: 'Yes, premium users can download lessons for offline viewing. Look for the download icon next to the lesson title. Downloaded lessons will be available in the "Downloads" section of your profile.',
      category: 'Learning'
    },
    {
      id: '6',
      question: 'How do I report a bug or issue?',
      answer: 'To report a bug or issue, click on the "Help" button in the navigation bar, then select "Report an Issue". Fill out the form with details about the problem you encountered.',
      category: 'Technical'
    },
    {
      id: '7',
      question: 'How do I update my profile information?',
      answer: 'To update your profile information, click on your profile picture in the top right corner, then select "Profile". Click the "Edit Profile" button to make changes to your information.',
      category: 'Account'
    },
    {
      id: '8',
      question: 'How do daily challenges work?',
      answer: 'Daily challenges are refreshed every 24 hours and are designed to help you practice your skills. Complete daily challenges to maintain your streak and earn bonus XP.',
      category: 'Gamification'
    }
  ];
  
  // Extract unique categories
  const categories = Array.from(new Set(faqItems.map(item => item.category)));
  
  // Filter FAQ items based on search and category
  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === null || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const toggleFAQ = (id: string) => {
    setExpandedFAQs(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Account':
        return <HelpCircle className="w-5 h-5" />;
      case 'Learning':
        return <Book className="w-5 h-5" />;
      case 'Community':
        return <MessageCircle className="w-5 h-5" />;
      case 'Gamification':
        return <Video className="w-5 h-5" />;
      case 'Technical':
        return <FileText className="w-5 h-5" />;
      default:
        return <HelpCircle className="w-5 h-5" />;
    }
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
        <p className="text-gray-600">
          Find answers to common questions and learn how to get the most out of YungsTech.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-base"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
            <div className="space-y-1">
              <button
                onClick={() => setActiveCategory(null)}
                className={`flex items-center w-full px-2 py-2 text-sm rounded-md ${
                  activeCategory === null
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HelpCircle className="w-5 h-5 mr-2" />
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center w-full px-2 py-2 text-sm rounded-md ${
                    activeCategory === category
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {getCategoryIcon(category)}
                  <span className="ml-2">{category}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-lg font-medium text-indigo-900 mb-2">Need more help?</h3>
              <p className="text-indigo-700 mb-4 text-sm">
                Can't find what you're looking for? Contact our support team for assistance.
              </p>
              <Button variant="primary" fullWidth>
                Contact Support
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          {filteredFAQs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery 
                  ? `No results found for "${searchQuery}"`
                  : 'No FAQs match the selected category'}
              </p>
              {(searchQuery || activeCategory) && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory(null);
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {filteredFAQs.map(item => (
                  <div key={item.id} className="p-6">
                    <button
                      onClick={() => toggleFAQ(item.id)}
                      className="flex w-full text-left"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                              expandedFAQs.includes(item.id) ? 'transform rotate-180' : ''
                            }`} 
                          />
                        </div>
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </button>
                    {expandedFAQs.includes(item.id) && (
                      <div className="mt-4 text-gray-600">
                        <p>{item.answer}</p>
                        <div className="mt-4 flex justify-end">
                          <div className="flex space-x-4 text-sm">
                            <button className="text-gray-500 hover:text-gray-700 flex items-center">
                              <ThumbsUpIcon className="w-4 h-4 mr-1" />
                              Helpful
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 flex items-center">
                              <ThumbsDownIcon className="w-4 h-4 mr-1" />
                              Not helpful
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-8 bg-indigo-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-indigo-900 mb-2">Popular Help Articles</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Getting Started Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  How to Complete Challenges
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Understanding Your Learning Path
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Account Security Best Practices
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components for the thumbs up/down icons
const ThumbsUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
  </svg>
);

const ThumbsDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2" />
  </svg>
);

export default Help;