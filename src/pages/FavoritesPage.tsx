import React, { useState, useEffect } from 'react';
import { usePalettes } from '../context/PaletteContext';
import PaletteGrid from '../components/PaletteGrid';
import SortSelector from '../components/SortSelector';
import { SortOption } from '../types/palette';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { palettes, favorites } = usePalettes();
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  
  const favoritePalettes = palettes
    .filter(palette => favorites.includes(palette.id))
    .sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        case 'popular':
          return b.likes - a.likes;
        case 'downloads':
          return b.downloads - a.downloads;
        default:
          return 0;
      }
    });

  useEffect(() => {
    document.title = 'My Favorites - Chromaverse';
  }, []);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">My Favorites</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your collection of saved color palettes.
        </p>
      </div>
      
      {favoritePalettes.length > 0 ? (
        <>
          <div className="mb-6 flex justify-end">
            <SortSelector value={sortOption} onChange={setSortOption} />
          </div>
          <PaletteGrid palettes={favoritePalettes} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-16 dark:border-gray-700">
          <p className="mb-4 text-lg text-gray-500 dark:text-gray-400">
            You haven't saved any favorites yet.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Explore Palettes
          </button>
          <span className="my-2 text-gray-400">or</span>
          <button 
            onClick={() => navigate('/create')}
            className="btn btn-outline"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Your Own
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;