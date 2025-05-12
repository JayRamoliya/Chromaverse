import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Palette, Search, Menu, X, Moon, Sun, PlusCircle,
  ImageDown 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white bg-opacity-95 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-95">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <Palette className="h-6 w-6 text-primary-500" />
            <span className="ml-2 text-xl font-bold">Chromaverse</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link 
            to="/" 
            className={`transition hover:text-primary-500 ${isActivePath('/') ? 'font-medium text-primary-500' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/trending" 
            className={`transition hover:text-primary-500 ${isActivePath('/trending') ? 'font-medium text-primary-500' : ''}`}
          >
            Trending
          </Link>
          <Link 
            to="/favorites" 
            className={`transition hover:text-primary-500 ${isActivePath('/favorites') ? 'font-medium text-primary-500' : ''}`}
          >
            Favorites
          </Link>
          <Link 
            to="/search" 
            className={`flex items-center transition hover:text-primary-500 ${isActivePath('/search') ? 'font-medium text-primary-500' : ''}`}
          >
            <Search className="mr-1 h-4 w-4" />
            Search
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost rounded-full p-2"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          
          <button
            onClick={() => navigate('/generate')}
            className="btn btn-outline hidden md:flex"
            title="Generate from Image"
          >
            <ImageDown className="mr-1 h-4 w-4" />
            Generate
          </button>
          
          <button
            onClick={() => navigate('/create')}
            className="btn btn-primary hidden md:flex"
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            Create
          </button>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="btn btn-ghost rounded-full p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="container mx-auto px-4 pb-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className={`rounded-md px-4 py-2 transition ${isActivePath('/') ? 'bg-gray-100 font-medium text-primary-500 dark:bg-gray-800' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/trending"
              className={`rounded-md px-4 py-2 transition ${isActivePath('/trending') ? 'bg-gray-100 font-medium text-primary-500 dark:bg-gray-800' : ''}`}
              onClick={closeMenu}
            >
              Trending
            </Link>
            <Link
              to="/favorites"
              className={`rounded-md px-4 py-2 transition ${isActivePath('/favorites') ? 'bg-gray-100 font-medium text-primary-500 dark:bg-gray-800' : ''}`}
              onClick={closeMenu}
            >
              Favorites
            </Link>
            <Link
              to="/search"
              className={`flex items-center rounded-md px-4 py-2 transition ${isActivePath('/search') ? 'bg-gray-100 font-medium text-primary-500 dark:bg-gray-800' : ''}`}
              onClick={closeMenu}
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Link>
            <Link
              to="/generate"
              className="btn btn-outline"
              onClick={closeMenu}
            >
              <ImageDown className="mr-2 h-4 w-4" />
              Generate from Image
            </Link>
            <Link
              to="/create"
              className="btn btn-primary"
              onClick={closeMenu}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Palette
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;