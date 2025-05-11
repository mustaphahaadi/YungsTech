import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Code,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold text-indigo-600 mb-4">YungsTech</h3>
            <p className="text-gray-600 mb-4">
              Empowering the next generation of tech innovators through interactive learning and community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600">
                <Code size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Learning</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">Learning Paths</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">Tutorials</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">Code Playground</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">Challenges</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">Certifications</a>
              </li>
            </ul>
          </div>
          
          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">Forums</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">Study Groups</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">Events</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">Contribute</a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin size={18} className="text-indigo-600 mr-2 mt-0.5" />
                <span className="text-gray-600">123 Tech Street, San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-indigo-600 mr-2" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-indigo-600">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-indigo-600 mr-2" />
                <a href="mailto:info@yungstech.com" className="text-gray-600 hover:text-indigo-600">info@yungstech.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} YungsTech. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;