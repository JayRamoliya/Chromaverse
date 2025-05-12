import React from 'react';
import { Github, Twitter, Instagram, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Palette className="h-6 w-6 text-primary-500" />
              <span className="ml-2 text-xl font-bold">Chromaverse</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Discover, create and share beautiful color palettes for your next project.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-500 transition hover:text-primary-500 dark:text-gray-400">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 transition hover:text-primary-500 dark:text-gray-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 transition hover:text-primary-500 dark:text-gray-400">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-600 transition hover:text-primary-500 dark:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-gray-600 transition hover:text-primary-500 dark:text-gray-400">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-600 transition hover:text-primary-500 dark:text-gray-400">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-gray-600 transition hover:text-primary-500 dark:text-gray-400">
                  Create Palette
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 transition hover:text-primary-500 dark:text-gray-400">
                  Color Theory
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 transition hover:text-primary-500 dark:text-gray-400">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 transition hover:text-primary-500 dark:text-gray-400">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 transition hover:text-primary-500 dark:text-gray-400">
                  Tools
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 transition hover:text-primary-500 dark:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 transition hover:text-primary-500 dark:text-gray-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 transition hover:text-primary-500 dark:text-gray-400">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 transition hover:text-primary-500 dark:text-gray-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Chromaverse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;