import React, { useState, useEffect } from 'react';
import { usePalettes } from '../context/PaletteContext';
import SearchInput from '../components/SearchInput';
import TagFilter from '../components/TagFilter';
import PaletteGrid from '../components/PaletteGrid';
import SortSelector from '../components/SortSelector';
import { SortOption } from '../types/palette';

const SearchPage: React.FC = () => {
  const { getFilteredPalettes } = usePalettes();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  
  const handleTagSelect = (tag: string) => {
    setSelectedTags([...selectedTags, tag]);
  };
  
  const handleTagRemove = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };
  
  const palettes = getFilteredPalettes({
    search: searchQuery,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    sortBy: sortOption
  });
  
  useEffect(() => {
    document.title = 'Search Palettes - Chromaverse';
  }, []);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Search Palettes</h1>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Find the perfect color palette for your next project by searching or filtering by tags.
        </p>
      </div>
      
      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="md:col-span-3">
          <SearchInput 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search by color, hex code, or keywords..." 
          />
        </div>
        <div>
          <SortSelector value={sortOption} onChange={setSortOption} />
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Filter by Tags</h2>
        <TagFilter
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
          onTagRemove={handleTagRemove}
        />
      </div>
      
      <div>
        <h2 className="mb-4 text-xl font-semibold">
          {palettes.length} {palettes.length === 1 ? 'Result' : 'Results'}
        </h2>
        <PaletteGrid 
          palettes={palettes}
          emptyMessage="No palettes found matching your search. Try different keywords or tags."
        />
      </div>
    </div>
  );
};

export default SearchPage;