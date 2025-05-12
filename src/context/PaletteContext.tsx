import React, { createContext, useContext, useState, useEffect } from 'react';
import { Palette, PaletteFilter, SortOption } from '../types/palette';
import { mockPalettes } from '../data/mockData';
import toast from 'react-hot-toast';

interface PaletteContextType {
  palettes: Palette[];
  favorites: string[];
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  createPalette: (palette: Omit<Palette, 'id' | 'created' | 'likes' | 'downloads'>) => string;
  getPalette: (id: string) => Palette | undefined;
  getFilteredPalettes: (filter: PaletteFilter) => Palette[];
  getTrendingPalettes: () => Palette[];
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

export const PaletteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [palettes, setPalettes] = useState<Palette[]>(mockPalettes);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (id: string) => {
    setFavorites(prev => {
      if (!prev.includes(id)) {
        toast.success('Added to favorites!');
        return [...prev, id];
      }
      return prev;
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => {
      toast.success('Removed from favorites');
      return prev.filter(paletteId => paletteId !== id);
    });
  };

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  const createPalette = (palette: Omit<Palette, 'id' | 'created' | 'likes' | 'downloads'>) => {
    const id = `custom-${Date.now()}`;
    const newPalette: Palette = {
      ...palette,
      id,
      created: new Date(),
      likes: 0,
      downloads: 0
    };
    
    setPalettes(prev => [newPalette, ...prev]);
    toast.success('Palette created successfully!');
    return id;
  };

  const getPalette = (id: string) => {
    return palettes.find(palette => palette.id === id);
  };

  const getFilteredPalettes = (filter: PaletteFilter) => {
    let filtered = [...palettes];
    
    if (filter.tags && filter.tags.length > 0) {
      filtered = filtered.filter(palette => 
        filter.tags!.some(tag => palette.tags.includes(tag))
      );
    }
    
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter(palette => 
        palette.title.toLowerCase().includes(searchLower) ||
        palette.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        palette.colors.some(color => 
          color.hex.toLowerCase().includes(searchLower) ||
          (color.name && color.name.toLowerCase().includes(searchLower))
        )
      );
    }
    
    if (filter.sortBy) {
      filtered = sortPalettes(filtered, filter.sortBy);
    } else {
      // Default sort by newest
      filtered = sortPalettes(filtered, 'newest');
    }
    
    return filtered;
  };
  
  const sortPalettes = (palettesToSort: Palette[], sortBy: SortOption) => {
    switch (sortBy) {
      case 'newest':
        return [...palettesToSort].sort((a, b) => 
          new Date(b.created).getTime() - new Date(a.created).getTime()
        );
      case 'popular':
        return [...palettesToSort].sort((a, b) => b.likes - a.likes);
      case 'downloads':
        return [...palettesToSort].sort((a, b) => b.downloads - a.downloads);
      default:
        return palettesToSort;
    }
  };
  
  const getTrendingPalettes = () => {
    return [...palettes]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 12);
  };

  return (
    <PaletteContext.Provider value={{
      palettes,
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      createPalette,
      getPalette,
      getFilteredPalettes,
      getTrendingPalettes
    }}>
      {children}
    </PaletteContext.Provider>
  );
};

export const usePalettes = (): PaletteContextType => {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error('usePalettes must be used within a PaletteProvider');
  }
  return context;
};