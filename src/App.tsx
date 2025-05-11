import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/navigation/Navbar';
import Home from './pages/Home';
import LearningPaths from './pages/LearningPaths';
import Achievements from './pages/Achievements';
import Progress from './pages/Progress';
import Leaderboard from './pages/Leaderboard';
import Community from './pages/Community';
import Playground from './pages/Playground';
import StudyGroups from './pages/StudyGroups';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Help from './pages/Help';
import Events from './pages/Events';
import Challenges from './pages/Challenges';
import Bookmarks from './pages/Bookmarks';
import Footer from './components/navigation/Footer';

function App() {
  const [currentNav, setCurrentNav] = useState('home');
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNavigateToPath = (pathId: string) => {
    setCurrentNav('paths');
    setSelectedPathId(pathId);
  };

  if (loading || !pageLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 relative">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-indigo-600">YT</div>
        </div>
        <p className="mt-4 text-indigo-600 font-medium">Loading YungsTech...</p>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const renderContent = () => {
    switch (currentNav) {
      case 'home':
        return <Home onNavigateToPath={handleNavigateToPath} />;
      case 'paths':
        return <LearningPaths selectedPathId={selectedPathId} />;
      case 'achievements':
        return <Achievements />;
      case 'challenges':
        return <Challenges />;
      case 'progress':
        return <Progress />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'community':
      case 'forum':
        return <Community activeTab={currentNav === 'forum' ? 'forum' : 'community'} />;
      case 'playground':
        return <Playground />;
      case 'groups':
        return <StudyGroups />;
      case 'events':
        return <Events />;
      case 'bookmarks':
        return <Bookmarks />;
      case 'help':
        return <Help />;
      case 'profile':
      case 'settings':
        return <Profile activeTab={currentNav === 'settings' ? 'settings' : 'profile'} />;
      default:
        return <Home onNavigateToPath={handleNavigateToPath} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar onNavChange={setCurrentNav} currentNav={currentNav} />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;