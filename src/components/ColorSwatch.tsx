import React, { useState } from 'react';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { Color } from '../types/palette';

interface ColorSwatchProps {
  color: Color;
  index: number;
  size?: 'sm' | 'md' | 'lg' | 'full';
  showHex?: boolean;
  showName?: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  index,
  size = 'md',
  showHex = true,
  showName = false,
}) => {
  const [copied, setCopied] = useState(false);
  
  // Determine if text should be white or black based on background color
  const getContrastColor = (hexColor: string) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return white for dark backgrounds, black for light backgrounds
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };
  
  const textColor = getContrastColor(color.hex);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  
  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'h-16 w-16';
      break;
    case 'md':
      sizeClasses = 'h-24 w-24';
      break;
    case 'lg':
      sizeClasses = 'h-36 w-36';
      break;
    case 'full':
      sizeClasses = 'h-full w-full';
      break;
  }
  
  return (
    <div
      className={`color-swatch ${sizeClasses} flex flex-col items-center justify-center rounded-md p-2 text-center shadow-sm transition-all hover:shadow-md ${copied ? 'copy-animation' : ''}`}
      style={{ backgroundColor: color.hex, color: textColor }}
      onClick={copyToClipboard}
    >
      <div className="flex items-center">
        {showHex && (
          <span className="font-mono text-sm">{color.hex}</span>
        )}
        <div className="ml-1">
          {copied ? (
            <ClipboardCheck className="h-4 w-4" />
          ) : (
            <Clipboard className="h-4 w-4" />
          )}
        </div>
      </div>
      
      {showName && color.name && (
        <span className="mt-1 text-xs">{color.name}</span>
      )}
    </div>
  );
};

export default ColorSwatch;