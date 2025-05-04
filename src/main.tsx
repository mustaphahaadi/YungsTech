import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import App from './App.tsx';
import './index.css';
import { initializeMockData } from './lib/mockData';

// Wait for the browser to be ready before initializing
const initializeApp = () => {
  // Wait a bit to ensure localStorage is available
  setTimeout(() => {
    try {
      initializeMockData();
    } catch (e) {
      console.error('Error initializing mock data:', e);
    }
  }, 100);
};

// Initialize after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);