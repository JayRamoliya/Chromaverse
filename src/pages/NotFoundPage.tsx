import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Page Not Found - Chromaverse';
  }, []);

  return (
    <div className="container flex h-[70vh] flex-col items-center justify-center py-16 text-center">
      <h1 className="mb-4 text-7xl font-bold text-primary-500">404</h1>
      <h2 className="mb-6 text-3xl font-bold">Page Not Found</h2>
      <p className="mb-8 max-w-md text-lg text-gray-600 dark:text-gray-300">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button 
        onClick={() => navigate('/')}
        className="btn btn-primary"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;