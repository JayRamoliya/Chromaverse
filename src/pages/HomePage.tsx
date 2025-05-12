import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { usePalettes } from '../context/PaletteContext';
import PaletteGrid from '../components/PaletteGrid';
import TagFilter from '../components/TagFilter';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { getFilteredPalettes } = usePalettes();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const handleTagSelect = (tag: string) => {
    setSelectedTags([...selectedTags, tag]);
  };
  
  const handleTagRemove = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };
  
  const palettes = getFilteredPalettes({ 
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    sortBy: 'newest'
  });

  return (
    <div className="container py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
          Discover Beautiful Color Palettes
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Find the perfect colors for your next project, or create your own custom palette to share with the world.
        </p>
        <button 
          onClick={() => navigate('/create')}
          className="btn btn-primary text-base"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Create Your Own Palette
        </button>
      </div>
      
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Filter by Tags</h2>
        <TagFilter
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
          onTagRemove={handleTagRemove}
        />
      </div>
      
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Latest Palettes</h2>
          <button 
            onClick={() => navigate('/trending')}
            className="btn btn-ghost text-primary-500"
          >
            View All
          </button>
        </div>
        <PaletteGrid palettes={palettes} />
      </div>
    </div>
  );
};

export default HomePage;