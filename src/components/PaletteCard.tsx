import React from 'react';
import { Heart, Download, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Palette } from '../types/palette';
import { usePalettes } from '../context/PaletteContext';

interface PaletteCardProps {
  palette: Palette;
}

const PaletteCard: React.FC<PaletteCardProps> = ({ palette }) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = usePalettes();
  const favorite = isFavorite(palette.id);
  
  const handleClick = () => {
    navigate(`/palette/${palette.id}`);
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(palette.id);
    } else {
      addToFavorites(palette.id);
    }
  };

  // Format the date
  const formattedDate = new Date(palette.created).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div 
      className="palette-card group" 
      onClick={handleClick}
    >
      <div className="flex h-28 overflow-hidden">
        {palette.colors.map((color, index) => (
          <div
            key={index}
            className="color-swatch flex-1 transition-transform group-hover:shadow-md"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
      
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-md font-medium">{palette.title}</h3>
          <button
            className="flex items-center justify-center rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={handleFavoriteClick}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`h-5 w-5 ${favorite ? 'fill-primary-500 text-primary-500' : 'text-gray-500 dark:text-gray-400'}`} 
            />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {palette.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Heart className="h-3.5 w-3.5" />
              <span>{palette.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-3.5 w-3.5" />
              <span>{palette.downloads}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaletteCard;