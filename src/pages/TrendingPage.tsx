import React, { useEffect } from 'react';
import { usePalettes } from '../context/PaletteContext';
import PaletteGrid from '../components/PaletteGrid';
import { Siren as Fire, TrendingUp, ThumbsUp, Download } from 'lucide-react';

const TrendingPage: React.FC = () => {
  const { getFilteredPalettes } = usePalettes();
  
  const popularPalettes = getFilteredPalettes({ sortBy: 'popular' }).slice(0, 12);
  const newestPalettes = getFilteredPalettes({ sortBy: 'newest' }).slice(0, 12);
  const mostDownloadedPalettes = getFilteredPalettes({ sortBy: 'downloads' }).slice(0, 12);
  
  useEffect(() => {
    document.title = 'Trending Palettes - Chromaverse';
  }, []);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Trending Palettes</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover the most popular color palettes that designers are using right now.
        </p>
      </div>
      
      <div className="mb-12">
        <div className="mb-4 flex items-center">
          <Fire className="mr-2 h-6 w-6 text-warning-500" />
          <h2 className="text-2xl font-bold">Hot Right Now</h2>
        </div>
        <PaletteGrid palettes={popularPalettes} />
      </div>
      
      <div className="mb-12">
        <div className="mb-4 flex items-center">
          <TrendingUp className="mr-2 h-6 w-6 text-success-500" />
          <h2 className="text-2xl font-bold">Fresh & New</h2>
        </div>
        <PaletteGrid palettes={newestPalettes} />
      </div>
      
      <div className="mb-12">
        <div className="mb-4 flex items-center">
          <Download className="mr-2 h-6 w-6 text-secondary-500" />
          <h2 className="text-2xl font-bold">Most Downloaded</h2>
        </div>
        <PaletteGrid palettes={mostDownloadedPalettes} />
      </div>
    </div>
  );
};

export default TrendingPage;