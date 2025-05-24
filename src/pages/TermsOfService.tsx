import React from 'react';
import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <FileText className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600">Last updated: May 24, 2025</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mb-4">
            By accessing or using YungsTech's platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Accounts</h2>
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Account Registration</h3>
                <p className="text-gray-600">You must provide accurate and complete information when creating an account.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Account Security</h3>
                <p className="text-gray-600">You are responsible for maintaining the security of your account credentials.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Platform Rules</h2>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">You agree not to:</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                Use the platform for any illegal purposes
              </li>
              <li className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                Share account credentials with others
              </li>
              <li className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                Upload malicious content or software
              </li>
              <li className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                Harass or harm other users
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
          <p className="text-gray-600 mb-4">
            All content on the platform, including but not limited to text, graphics, logos, and code examples,
            is the property of YungsTech or its content suppliers and is protected by intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment Terms</h2>
          <div className="bg-gray-50 rounded-xl p-6">
            <ul className="space-y-4 text-gray-600">
              <li>• Subscription fees are billed in advance on a monthly basis</li>
              <li>• All fees are non-refundable unless required by law</li>
              <li>• We may change our fees upon 30 days notice</li>
              <li>• Failure to pay may result in account suspension</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimer of Warranties</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <p className="text-gray-700">
              The platform is provided "as is" without any warranties, expressed or implied.
              YungsTech does not warrant that the platform will be error-free or uninterrupted.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Information</h2>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-900">For any questions about these Terms, please contact us at:</p>
            <p className="text-gray-900 mt-2">Email: legal@yungstech.com</p>
            <p className="text-gray-900">Address: 123 Tech Street, San Francisco, CA 94107</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
