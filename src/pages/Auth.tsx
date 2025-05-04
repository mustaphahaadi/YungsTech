import React, { useState } from 'react';
import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';
import { BookOpen } from 'lucide-react';

const Auth: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleAuthSuccess = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
            <BookOpen className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">YungsTech</h1>
          <p className="text-gray-600 mt-2">Your journey to tech mastery begins here</p>
        </div>

        {isSignIn ? (
          <SignInForm
            onSuccess={handleAuthSuccess}
            onSignUpClick={() => setIsSignIn(false)}
          />
        ) : (
          <SignUpForm
            onSuccess={handleAuthSuccess}
            onSignInClick={() => setIsSignIn(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;