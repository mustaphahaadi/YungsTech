import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import Landing from './pages/Landing';
import Tutorials from './pages/Tutorials';
import Certifications from './pages/Certifications';
import Forums from './pages/Forums';
import Blog from './pages/Blog';
import Contribute from './pages/Contribute';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

function App() {
  const [currentNav, setCurrentNav] = useState('home');
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {user && <Navbar onNavChange={setCurrentNav} currentNav={currentNav} />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={!user ? <Landing /> : <Navigate to="/home" />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/home" />} />
          
          {/* Protected Routes - require authentication */}
          <Route path="/home" element={user ? <Home onNavigateToPath={handleNavigateToPath} /> : <Navigate to="/" />} />
          <Route path="/paths" element={user ? <LearningPaths selectedPathId={selectedPathId} /> : <Navigate to="/" />} />
          <Route path="/achievements" element={user ? <Achievements /> : <Navigate to="/" />} />
          <Route path="/challenges" element={user ? <Challenges /> : <Navigate to="/" />} />
          <Route path="/progress" element={user ? <Progress /> : <Navigate to="/" />} />
          <Route path="/leaderboard" element={user ? <Leaderboard /> : <Navigate to="/" />} />
          <Route path="/community" element={user ? <Community /> : <Navigate to="/" />} />
          <Route path="/forum" element={user ? <Community /> : <Navigate to="/" />} />
          <Route path="/playground" element={user ? <Playground /> : <Navigate to="/" />} />
          <Route path="/groups" element={user ? <StudyGroups /> : <Navigate to="/" />} />
          <Route path="/events" element={user ? <Events /> : <Navigate to="/" />} />
          <Route path="/bookmarks" element={user ? <Bookmarks /> : <Navigate to="/" />} />
          <Route path="/help" element={user ? <Help /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile activeTab="profile" /> : <Navigate to="/" />} />
          <Route path="/settings" element={user ? <Profile activeTab="settings" /> : <Navigate to="/" />} />
          
          {/* Additional routes from Footer */}
          <Route path="/tutorials" element={user ? <Tutorials /> : <Navigate to="/" />} />
          <Route path="/certifications" element={user ? <Certifications /> : <Navigate to="/" />} />
          <Route path="/forums" element={user ? <Forums /> : <Navigate to="/" />} />
          <Route path="/blog" element={user ? <Blog /> : <Navigate to="/" />} />
          <Route path="/contribute" element={user ? <Contribute /> : <Navigate to="/" />} />
          
          {/* Policy pages - available to all users */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;