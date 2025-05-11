import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ExternalLink, Filter, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'webinar' | 'workshop' | 'hackathon' | 'conference';
  attendees: number;
  maxAttendees: number;
  image: string;
  link?: string;
}

const Events: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const events: Event[] = [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      description: 'Learn the basics of machine learning algorithms and how to implement them in Python.',
      date: '2023-11-15',
      time: '18:00 - 20:00',
      location: 'Online',
      type: 'webinar',
      attendees: 156,
      maxAttendees: 500,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      link: 'https://zoom.us/webinar/register/123456'
    },
    {
      id: '2',
      title: 'React Advanced Workshop',
      description: 'Deep dive into advanced React patterns, hooks, and performance optimization techniques.',
      date: '2023-11-20',
      time: '10:00 - 16:00',
      location: 'Tech Hub, San Francisco',
      type: 'workshop',
      attendees: 42,
      maxAttendees: 50,
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '3',
      title: 'YungsTech Hackathon 2023',
      description: 'Join our annual hackathon and build innovative solutions to real-world problems.',
      date: '2023-12-01',
      time: '09:00 - 21:00',
      location: 'Innovation Center, New York',
      type: 'hackathon',
      attendees: 87,
      maxAttendees: 100,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '4',
      title: 'Cloud Computing Conference',
      description: 'Explore the latest trends and technologies in cloud computing with industry experts.',
      date: '2023-12-15',
      time: '09:00 - 18:00',
      location: 'Convention Center, Seattle',
      type: 'conference',
      attendees: 320,
      maxAttendees: 500,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '5',
      title: 'Cybersecurity Best Practices',
      description: 'Learn how to protect your applications and data from common security threats.',
      date: '2023-12-10',
      time: '14:00 - 16:00',
      location: 'Online',
      type: 'webinar',
      attendees: 210,
      maxAttendees: 300,
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      link: 'https://zoom.us/webinar/register/789012'
    },
    {
      id: '6',
      title: 'Mobile App Development Workshop',
      description: 'Hands-on workshop on building cross-platform mobile applications with React Native.',
      date: '2023-11-25',
      time: '10:00 - 15:00',
      location: 'Tech Campus, Austin',
      type: 'workshop',
      attendees: 28,
      maxAttendees: 30,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];
  
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.type === filter);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'webinar':
        return 'bg-blue-100 text-blue-800';
      case 'workshop':
        return 'bg-green-100 text-green-800';
      case 'hackathon':
        return 'bg-purple-100 text-purple-800';
      case 'conference':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h1>
        <p className="text-gray-600">
          Join our live events, workshops, and webinars to enhance your skills and connect with the community.
        </p>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter by type
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          
          {showFilters && (
            <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="py-1">
                <button
                  onClick={() => {
                    setFilter('all');
                    setShowFilters(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${filter === 'all' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  All Events
                </button>
                <button
                  onClick={() => {
                    setFilter('webinar');
                    setShowFilters(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${filter === 'webinar' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Webinars
                </button>
                <button
                  onClick={() => {
                    setFilter('workshop');
                    setShowFilters(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${filter === 'workshop' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Workshops
                </button>
                <button
                  onClick={() => {
                    setFilter('hackathon');
                    setShowFilters(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${filter === 'hackathon' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Hackathons
                </button>
                <button
                  onClick={() => {
                    setFilter('conference');
                    setShowFilters(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${filter === 'conference' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Conferences
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 sm:mt-0">
          <Button variant="primary">
            Submit an Event
          </Button>
        </div>
      </div>
      
      {filter !== 'all' && (
        <div className="mb-6 bg-indigo-50 border border-indigo-100 rounded-md p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-indigo-700">Filtered by: </span>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(filter)}`}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </span>
          </div>
          <button
            onClick={() => setFilter('all')}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Clear filter
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{event.attendees}/{event.maxAttendees}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <Button 
                variant="primary" 
                fullWidth
                icon={event.link ? <ExternalLink className="w-4 h-4" /> : undefined}
              >
                {event.link ? 'Register Now' : 'RSVP'}
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredEvents.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">
            There are no upcoming {filter !== 'all' ? filter : ''} events at the moment.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setFilter('all')}
          >
            View all events
          </Button>
        </div>
      )}
    </div>
  );
};

export default Events;