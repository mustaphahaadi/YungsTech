import React from 'react';
import { Link } from 'react-router-dom';
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
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600">
                <Code size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Learning</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/paths" className="text-gray-600 hover:text-indigo-600">Learning Paths</Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-gray-600 hover:text-indigo-600">Tutorials</Link>
              </li>
              <li>
                <Link to="/playground" className="text-gray-600 hover:text-indigo-600">Code Playground</Link>
              </li>
              <li>
                <Link to="/challenges" className="text-gray-600 hover:text-indigo-600">Challenges</Link>
              </li>
              <li>
                <Link to="/certifications" className="text-gray-600 hover:text-indigo-600">Certifications</Link>
              </li>
            </ul>
          </div>
          
          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/forums" className="text-gray-600 hover:text-indigo-600">Forums</Link>
              </li>
              <li>
                <Link to="/groups" className="text-gray-600 hover:text-indigo-600">Study Groups</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-600 hover:text-indigo-600">Events</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-indigo-600">Blog</Link>
              </li>
              <li>
                <Link to="/contribute" className="text-gray-600 hover:text-indigo-600">Contribute</Link>
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
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-indigo-600">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-indigo-600">Terms of Service</Link>
              <Link to="/cookies" className="text-sm text-gray-500 hover:text-indigo-600">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;