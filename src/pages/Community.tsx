import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import { MessageSquare, ThumbsUp, Share2, Users, MessageCircle } from 'lucide-react';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: number;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: Date;
}

const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      name: "Alex Thompson",
      avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
      level: 8
    },
    content: "Just completed my first HTML project! Check out my personal webpage 🎉",
    image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg",
    likes: 24,
    comments: 5,
    timestamp: new Date('2024-03-10T14:30:00')
  },
  {
    id: '2',
    user: {
      name: "Maria Garcia",
      avatar: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg",
      level: 12
    },
    content: "Looking for study buddies for the Advanced JavaScript course! Anyone interested?",
    likes: 15,
    comments: 8,
    timestamp: new Date('2024-03-10T12:15:00')
  }
];

const Community: React.FC = () => {
  const [newPost, setNewPost] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Users className="mr-2 h-6 w-6 text-blue-500" />
          Community
        </h2>
      </div>

      {/* Create Post */}
      <Card className="bg-white">
        <div className="flex gap-4">
          <Avatar
            src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
            alt="Your avatar"
            size="md"
          />
          <div className="flex-1">
            <textarea
              className="w-full border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Share your learning journey..."
              rows={3}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <div className="mt-3 flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Add Image
                </Button>
                <Button variant="outline" size="sm">
                  Add Code
                </Button>
              </div>
              <Button variant="primary" size="sm" disabled={!newPost.trim()}>
                Post
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-4">
        {mockPosts.map((post) => (
          <Card key={post.id} className="bg-white">
            <div className="flex items-start gap-4">
              <Avatar
                src={post.user.avatar}
                alt={post.user.name}
                size="md"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{post.user.name}</h3>
                    <p className="text-sm text-gray-500">Level {post.user.level}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(post.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <p className="mt-3 text-gray-700">{post.content}</p>

                {post.image && (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="mt-3 rounded-lg w-full object-cover max-h-96"
                  />
                )}

                <div className="mt-4 flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Comment Input */}
                <div className="mt-4 flex items-center gap-3">
                  <Avatar
                    src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
                    alt="Your avatar"
                    size="sm"
                  />
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="w-full border border-gray-200 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600">
                      <MessageCircle className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Community;