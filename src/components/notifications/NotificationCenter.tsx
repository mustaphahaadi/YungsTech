import React, { useState, useEffect } from 'react';
import { localStorageClient } from '../../lib/localStorage';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Bell, Star, Trophy, Calendar, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'achievement' | 'reminder' | 'streak' | 'challenge';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchNotifications = () => {
      // Get notifications from localStorage
      const notificationsJson = window.localStorage.getItem('yungs_tech_db_notifications') || '[]';
      try {
        let data = JSON.parse(notificationsJson);
        
        // Sort by created_at in descending order
        data.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        // Limit results if not showing all
        if (!showAll && data.length > 5) {
          data = data.slice(0, 5);
        }
        
        setNotifications(data);
      } catch (e) {
        console.error('Failed to parse notifications from localStorage', e);
        setNotifications([]);
      }
    };

    fetchNotifications();
    
    // Set up a simple polling mechanism to check for new notifications
    const intervalId = setInterval(fetchNotifications, 5000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [showAll]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Trophy className="h-5 w-5 text-amber-500" />;
      case 'streak':
        return <Star className="h-5 w-5 text-indigo-500" />;
      case 'challenge':
        return <Calendar className="h-5 w-5 text-emerald-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const markAsRead = async (id: string) => {
    // Get notifications from localStorage
    const notificationsJson = window.localStorage.getItem('yungs_tech_db_notifications') || '[]';
    try {
      let allNotifications = JSON.parse(notificationsJson);
      
      // Update the notification with the matching id
      const updatedNotifications = allNotifications.map((n: any) => 
        n.id === id ? { ...n, read: true } : n
      );
      
      // Save back to localStorage
      window.localStorage.setItem('yungs_tech_db_notifications', JSON.stringify(updatedNotifications));
      
      // Update state
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (e) {
      console.error('Failed to update notification', e);
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-indigo-500" />
          <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
        </div>
        <Badge variant="primary">
          {notifications.filter(n => !n.read).length} New
        </Badge>
      </div>

      <div className="space-y-4">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`relative p-4 rounded-lg ${
              notification.read ? 'bg-gray-50' : 'bg-blue-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{notification.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </div>
              </div>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {notifications.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-indigo-600 hover:text-indigo-500 text-sm font-medium"
        >
          {showAll ? 'Show Less' : 'View All Notifications'}
        </button>
      )}
    </Card>
  );
};

export default NotificationCenter;