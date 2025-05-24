import React from 'react';
import { Cookie, Info, Lock } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <Cookie className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
        <p className="text-gray-600">Last updated: May 24, 2025</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-600">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website.
              They help us make your experience better by remembering your preferences and understanding how you use our platform.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Essential Cookies</h3>
                  <p className="text-gray-600">
                    Required for the platform to function properly. These cannot be disabled.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Performance Cookies</h3>
                  <p className="text-gray-600">
                    Help us understand how visitors interact with our platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-purple-500 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Functionality Cookies</h3>
                  <p className="text-gray-600">
                    Remember your preferences and personalize your experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Management</h2>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">You can manage cookies by:</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <Lock className="w-5 h-5 text-indigo-600 mr-2" />
                Adjusting your browser settings
              </li>
              <li className="flex items-center">
                <Lock className="w-5 h-5 text-indigo-600 mr-2" />
                Using our cookie preferences center
              </li>
              <li className="flex items-center">
                <Lock className="w-5 h-5 text-indigo-600 mr-2" />
                Opting out of specific cookie types
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
          <p className="text-gray-600 mb-4">
            Some of our pages may contain content from third parties (like YouTube videos or social media widgets)
            that may set their own cookies. We don't have control over these cookies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Choices</h2>
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="space-y-4">
              <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Accept All Cookies
              </button>
              <button className="w-full py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                Manage Cookie Preferences
              </button>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-900">If you have questions about our cookie policy, please contact us at:</p>
            <p className="text-gray-900 mt-2">Email: privacy@yungstech.com</p>
            <p className="text-gray-900">Address: 123 Tech Street, San Francisco, CA 94107</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
