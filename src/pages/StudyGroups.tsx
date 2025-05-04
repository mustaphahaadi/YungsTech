import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { StudyGroup } from '../types';
import { Users, Search, Plus, BookOpen, MessageSquare, Calendar, Link } from 'lucide-react';

const mockStudyGroups: StudyGroup[] = [
  {
    id: '1',
    name: 'JavaScript Beginners',
    description: 'Learn JavaScript fundamentals together',
    topic: 'JavaScript',
    level: 'beginner',
    members: [
      {
        id: '1',
        user: {
          id: '1',
          name: 'Alex Thompson',
          avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
          level: 8,
          xp: 1200,
          achievements: [],
          completedLessons: [],
          currentPath: 'path-1'
        },
        role: 'leader',
        joinedAt: new Date('2024-03-01')
      }
    ],
    resources: [
      {
        id: '1',
        title: 'JavaScript Basics Guide',
        type: 'document',
        url: 'https://example.com/js-guide',
        addedBy: '1',
        addedAt: new Date('2024-03-05')
      }
    ],
    messages: [],
    createdAt: new Date('2024-03-01'),
    meetingTime: 'Mondays at 7:00 PM EST',
    maxMembers: 10
  }
];

const StudyGroups: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Users className="mr-2 h-6 w-6 text-blue-500" />
          Study Groups
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowCreateModal(true)}
          icon={<Plus className="h-4 w-4" />}
        >
          Create Group
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search study groups..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockStudyGroups.map((group) => (
          <Card
            key={group.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedGroup(group)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{group.name}</h3>
                <p className="text-gray-600 mt-1">{group.description}</p>
              </div>
              <Badge variant={
                group.level === 'beginner' ? 'success' :
                group.level === 'intermediate' ? 'warning' : 'danger'
              }>
                {group.level}
              </Badge>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-4 w-4" />
                <span>{group.members.length}/{group.maxMembers} members</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{group.meetingTime}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <BookOpen className="h-4 w-4" />
                <span>{group.resources.length} resources</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {group.members.slice(0, 3).map((member) => (
                    <Avatar
                      key={member.id}
                      src={member.user.avatar}
                      alt={member.user.name}
                      size="sm"
                      className="border-2 border-white"
                    />
                  ))}
                  {group.members.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                      +{group.members.length - 3}
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  Join
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Group Details Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedGroup.name}</h2>
                <p className="text-gray-600 mt-1">{selectedGroup.description}</p>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setSelectedGroup(null)}
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Members */}
              <div className="md:col-span-1 space-y-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Members
                </h3>
                <div className="space-y-2">
                  {selectedGroup.members.map((member) => (
                    <div key={member.id} className="flex items-center gap-2">
                      <Avatar
                        src={member.user.avatar}
                        alt={member.user.name}
                        size="sm"
                      />
                      <div>
                        <div className="font-medium text-gray-800">{member.user.name}</div>
                        <div className="text-xs text-gray-500">
                          {member.role} · Level {member.user.level}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Group Chat
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 h-96 flex flex-col">
                  <div className="flex-1 overflow-y-auto">
                    {/* Chat messages would go here */}
                  </div>
                  <div className="mt-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Button variant="primary">Send</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="mt-6">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                <Link className="h-4 w-4" />
                Resources
              </h3>
              <div className="space-y-2">
                {selectedGroup.resources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{resource.title}</div>
                        <div className="text-sm text-gray-500">Added {resource.addedAt.toLocaleDateString()}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StudyGroups;