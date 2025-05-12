import React from 'react';
import { Palette } from '../types/palette';
import PaletteCard from './PaletteCard';

interface PaletteGridProps {
  palettes: Palette[];
  emptyMessage?: string;
}

const PaletteGrid: React.FC<PaletteGridProps> = ({ 
  palettes, 
  emptyMessage = 'No palettes found' 
}) => {
  if (palettes.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {palettes.map(palette => (
        <PaletteCard key={palette.id} palette={palette} />
      ))}
    </div>
  );
};

export default PaletteGrid;