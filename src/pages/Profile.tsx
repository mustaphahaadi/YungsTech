import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, Shield, Bell, CreditCard } from 'lucide-react';
import Button from '../components/ui/Button';

interface ProfileProps {
  activeTab?: 'profile' | 'settings';
}

const Profile: React.FC<ProfileProps> = ({ activeTab = 'profile' }) => {
  const { user, updateUser } = useAuth();
  const [currentTab, setCurrentTab] = useState<'profile' | 'settings' | 'security' | 'notifications' | 'billing'>(
    activeTab === 'settings' ? 'settings' : 'profile'
  );
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    learning_speed: user?.learning_speed || 'medium',
    preferred_learning_style: user?.preferred_learning_style || 'visual',
    daily_goal: user?.daily_goal || 30
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'daily_goal' ? parseInt(value) : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSaving(true);
    
    try {
      await updateUser(formData);
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="w-5 h-5" /> }
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-gray-50 p-6 border-r border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Account</h2>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                  currentTab === tab.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-6">
          {currentTab === 'profile' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                {!isEditing && (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
              
              {error && (
                <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
              
              {successMessage && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                  {successMessage}
                </div>
              )}
              
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="learning_speed" className="block text-sm font-medium text-gray-700 mb-1">
                      Learning Speed
                    </label>
                    <select
                      id="learning_speed"
                      name="learning_speed"
                      value={formData.learning_speed}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="slow">Slow</option>
                      <option value="medium">Medium</option>
                      <option value="fast">Fast</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="preferred_learning_style" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Learning Style
                    </label>
                    <select
                      id="preferred_learning_style"
                      name="preferred_learning_style"
                      value={formData.preferred_learning_style}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="visual">Visual</option>
                      <option value="practical">Practical</option>
                      <option value="theoretical">Theoretical</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="daily_goal" className="block text-sm font-medium text-gray-700 mb-1">
                      Daily Goal (minutes)
                    </label>
                    <input
                      id="daily_goal"
                      name="daily_goal"
                      type="number"
                      min="5"
                      max="240"
                      value={formData.daily_goal}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          username: user?.username || '',
                          email: user?.email || '',
                          learning_speed: user?.learning_speed || 'medium',
                          preferred_learning_style: user?.preferred_learning_style || 'visual',
                          daily_goal: user?.daily_goal || 30
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Username</h3>
                    <p className="mt-1 text-lg text-gray-900">{user?.username}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Learning Speed</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {user?.learning_speed.charAt(0).toUpperCase() + user?.learning_speed.slice(1)}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Preferred Learning Style</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {user?.preferred_learning_style.charAt(0).toUpperCase() + user?.preferred_learning_style.slice(1)}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Daily Goal</h3>
                    <p className="mt-1 text-lg text-gray-900">{user?.daily_goal} minutes</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {currentTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Theme Preferences</h3>
                  <div className="flex items-center space-x-4">
                    <button className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"></button>
                    <button className="w-10 h-10 rounded-full bg-gray-900 border-2 border-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"></button>
                    <button className="w-10 h-10 rounded-full bg-indigo-600 border-2 border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"></button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Language</h3>
                  <select className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Accessibility</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="high-contrast"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="high-contrast" className="ml-2 block text-sm text-gray-700">
                        High contrast mode
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="larger-text"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="larger-text" className="ml-2 block text-sm text-gray-700">
                        Larger text
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="reduced-motion"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="reduced-motion" className="ml-2 block text-sm text-gray-700">
                        Reduced motion
                      </label>
                    </div>
                  </div>
                </div>
                
                <Button variant="primary">Save Settings</Button>
              </div>
            </div>
          )}
          
          {currentTab === 'security' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        id="current-password"
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        id="new-password"
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <Button variant="primary">Update Password</Button>
                  </form>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                  <p className="text-gray-600 mb-4">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
            </div>
          )}
          
          {currentTab === 'notifications' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700 font-medium">Learning Reminders</p>
                        <p className="text-sm text-gray-500">Get reminders to complete your daily goals</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="toggle-1" className="sr-only" />
                        <label htmlFor="toggle-1" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700 font-medium">Achievement Unlocked</p>
                        <p className="text-sm text-gray-500">Get notified when you earn new achievements</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="toggle-2" className="sr-only" defaultChecked />
                        <label htmlFor="toggle-2" className="block overflow-hidden h-6 rounded-full bg-indigo-500 cursor-pointer"></label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700 font-medium">New Courses</p>
                        <p className="text-sm text-gray-500">Get notified when new courses are available</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="toggle-3" className="sr-only" defaultChecked />
                        <label htmlFor="toggle-3" className="block overflow-hidden h-6 rounded-full bg-indigo-500 cursor-pointer"></label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700 font-medium">Daily Challenges</p>
                        <p className="text-sm text-gray-500">Get notified about new daily challenges</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="toggle-4" className="sr-only" defaultChecked />
                        <label htmlFor="toggle-4" className="block overflow-hidden h-6 rounded-full bg-indigo-500 cursor-pointer"></label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700 font-medium">Community Messages</p>
                        <p className="text-sm text-gray-500">Get notified when you receive messages</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="toggle-5" className="sr-only" />
                        <label htmlFor="toggle-5" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="primary">Save Preferences</Button>
              </div>
            </div>
          )}
          
          {currentTab === 'billing' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing Information</h2>
              
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
                <p>You are currently on the <strong>Free Plan</strong>.</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Upgrade to Premium</h3>
                  <p className="text-gray-600 mb-4">
                    Get access to all premium features and content with our Premium plan.
                  </p>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">Premium Plan</h4>
                        <p className="text-gray-600">Full access to all features and content</p>
                      </div>
                      <div className="text-2xl font-bold text-gray-800">$9.99<span className="text-sm text-gray-500">/month</span></div>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Unlimited access to all courses</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Advanced code challenges</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Personalized learning path</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Priority support</span>
                      </li>
                    </ul>
                    <Button variant="primary" fullWidth>Upgrade Now</Button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
                  <p className="text-gray-600 mb-4">
                    No payment methods added yet.
                  </p>
                  <Button variant="outline">Add Payment Method</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;