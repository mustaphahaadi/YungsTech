import React, { useState } from 'react';
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

function App() {
  const [currentNav, setCurrentNav] = useState('home');
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const { user, loading } = useAuth();

  const handleNavigateToPath = (pathId: string) => {
    setCurrentNav('paths');
    setSelectedPathId(pathId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
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
        return <LearningPaths />;
      case 'achievements':
        return <Achievements />;
      case 'progress':
        return <Progress />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'community':
        return <Community />;
      case 'playground':
        return <Playground />;
      case 'groups':
        return <StudyGroups />;
      case 'profile':
        return <Profile />;
      default:
        return <Home onNavigateToPath={handleNavigateToPath} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar onNavChange={setCurrentNav} currentNav={currentNav} />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-10">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;