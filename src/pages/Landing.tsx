import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-400 opacity-30 rounded-full filter blur-3xl z-0 animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 opacity-30 rounded-full filter blur-3xl z-0 animate-pulse" />

      <header className="w-full max-w-4xl mx-auto flex flex-col items-center py-16 z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg text-center animate-fade-in">
          Welcome to <span className='bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-400'>YungsTech</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-center max-w-2xl animate-fade-in delay-100">
          Begin your coding journey with gamified learning, real-time collaboration, and a vibrant community.
        </p>

        {/* Enhanced Auth Section */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl mb-8 animate-fade-in delay-150">
          <div className="flex flex-col gap-4">
            <Link to="/auth?mode=signup" 
              className="w-full px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-xl transition-all duration-200 transform hover:scale-105 text-center">
              Create Free Account
            </Link>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/70">or</span>
              </div>
            </div>
            <Link to="/auth?mode=signin" 
              className="w-full px-8 py-4 bg-white hover:bg-gray-100 text-blue-700 font-bold rounded-xl shadow-xl transition-all duration-200 transform hover:scale-105 text-center">
              Sign In
            </Link>
          </div>
          <p className="text-center mt-4 text-sm text-white/80">
            No credit card required • Instant access
          </p>
        </div>

        {/* Quick Access Button */}
        <Link to="/playground" 
          className="px-8 py-3 bg-transparent border-2 border-white font-semibold rounded-xl hover:bg-white hover:text-blue-700 transition-all duration-200 transform hover:scale-105 animate-fade-in delay-200">
          Try Playground Without Account
        </Link>
      </header>

      {/* Feature Cards Section */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 z-10">
        <div className="bg-white bg-opacity-10 rounded-2xl p-8 shadow-2xl flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:bg-opacity-20 animate-fade-in-up">
          <span className="text-5xl mb-4">🎯</span>
          <h2 className="text-2xl font-bold mb-2">Daily Challenges</h2>
          <p className="text-center">Level up with daily coding challenges and earn rewards for your streaks.</p>
        </div>
        <div className="bg-white bg-opacity-10 rounded-2xl p-8 shadow-2xl flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:bg-opacity-20 animate-fade-in-up delay-100">
          <span className="text-5xl mb-4">🌱</span>
          <h2 className="text-2xl font-bold mb-2">Skill Trees</h2>
          <p className="text-center">Visualize your progress with interactive skill trees and unlock achievements.</p>
        </div>
        <div className="bg-white bg-opacity-10 rounded-2xl p-8 shadow-2xl flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:bg-opacity-20 animate-fade-in-up delay-200">
          <span className="text-5xl mb-4">🤝</span>
          <h2 className="text-2xl font-bold mb-2">Community</h2>
          <p className="text-center">Join study groups and collaborate with a supportive coding community.</p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="w-full max-w-3xl mx-auto mt-16 flex flex-col items-center z-10 animate-fade-in-up delay-300">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm text-white/80">Active Learners</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-white/80">Daily Challenges</div>
            </div>
            <div>
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm text-white/80">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-20 text-sm text-white/70 z-10">&copy; {new Date().getFullYear()} YungsTech. All rights reserved.</footer>

      {/* Custom Animations */}
      <style>{`
        .animate-fade-in { animation: fadeIn 1s ease; }
        .animate-fade-in-up { animation: fadeInUp 1s ease; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-150 { animation-delay: 0.15s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Landing;
