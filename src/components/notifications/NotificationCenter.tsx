import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
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
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(showAll ? 50 : 5);

      if (data && !error) {
        setNotifications(data);
      }
    };

    fetchNotifications();

    // Subscribe to new notifications
    const subscription = supabase
      .channel('notifications')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications' 
      }, payload => {
        setNotifications(current => [payload.new as Notification, ...current]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
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
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);

    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
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