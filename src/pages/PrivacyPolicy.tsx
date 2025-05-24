import React from 'react';
import { Shield, Lock, FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <Shield className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600">Last updated: May 24, 2025</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-600 mb-4">
            At YungsTech, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
          <div className="bg-gray-50 rounded-xl p-6 mb-4">
            <h3 className="font-bold text-gray-900 mb-2">Personal Information</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Name and email address</li>
              <li>Profile information</li>
              <li>Learning progress and achievements</li>
              <li>Payment information (if applicable)</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Usage Information</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Log data and device information</li>
              <li>Learning patterns and preferences</li>
              <li>Communication data</li>
              <li>Performance metrics</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
          <ul className="space-y-4 text-gray-600">
            <li>• To provide and maintain our platform</li>
            <li>• To personalize your learning experience</li>
            <li>• To communicate with you about updates and changes</li>
            <li>• To analyze and improve our services</li>
            <li>• To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
          <div className="flex items-start space-x-4 mb-4">
            <Lock className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
            <p className="text-gray-600">
              We implement appropriate technical and organizational measures to maintain the security of your personal information.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
          <div className="bg-white shadow-md rounded-xl p-6">
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <FileText className="w-5 h-5 text-indigo-600 mr-2" />
                Right to access your personal information
              </li>
              <li className="flex items-center">
                <FileText className="w-5 h-5 text-indigo-600 mr-2" />
                Right to rectify inaccurate information
              </li>
              <li className="flex items-center">
                <FileText className="w-5 h-5 text-indigo-600 mr-2" />
                Right to erasure ("right to be forgotten")
              </li>
              <li className="flex items-center">
                <FileText className="w-5 h-5 text-indigo-600 mr-2" />
                Right to restrict processing
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-900">Email: privacy@yungstech.com</p>
            <p className="text-gray-900">Address: 123 Tech Street, San Francisco, CA 94107</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
