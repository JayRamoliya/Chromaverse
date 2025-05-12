import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, Download, Share2, ArrowLeft, Copy, Instagram,
  Twitter, Facebook, Link, Check 
} from 'lucide-react';
import { usePalettes } from '../context/PaletteContext';
import ColorSwatch from '../components/ColorSwatch';
import { getHarmonyPalette } from '../utils/colorUtils';
import toast from 'react-hot-toast';

const PalettePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPalette, addToFavorites, removeFromFavorites, isFavorite } = usePalettes();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'colors' | 'harmonies'>('colors');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  const palette = getPalette(id || '');
  const favorite = palette ? isFavorite(palette.id) : false;
  
  useEffect(() => {
    if (palette) {
      document.title = `${palette.title} - Chromaverse`;
      
      if (palette.colors.length > 0 && !selectedColor) {
        setSelectedColor(palette.colors[0].hex);
      }
    } else {
      document.title = 'Palette Not Found - Chromaverse';
    }
  }, [palette, selectedColor]);
  
  if (!palette) {
    return (
      <div className="container flex h-[70vh] flex-col items-center justify-center py-8">
        <h1 className="mb-4 text-3xl font-bold">Palette Not Found</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          The palette you're looking for doesn't exist or has been removed.
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
  }
  
  const handleDownload = () => {
    // In a real app, this would generate a file
    toast.success('Palette downloaded');
  };
  
  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFromFavorites(palette.id);
    } else {
      addToFavorites(palette.id);
    }
  };
  
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };
  
  const copyCSS = () => {
    const cssVars = palette.colors.map((color, index) => 
      `  --color-${index + 1}: ${color.hex};`
    ).join('\n');
    
    const css = `:root {\n${cssVars}\n}`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('CSS variables copied to clipboard');
  };
  
  // Format the date
  const formattedDate = new Date(palette.created).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Generate harmonies if a color is selected
  let analogous: string[] = [];
  let complementary: string[] = [];
  let triadic: string[] = [];
  let tetradic: string[] = [];
  let monochromatic: string[] = [];
  
  if (selectedColor) {
    analogous = getHarmonyPalette(selectedColor, 'analogous');
    complementary = getHarmonyPalette(selectedColor, 'complementary');
    triadic = getHarmonyPalette(selectedColor, 'triadic');
    tetradic = getHarmonyPalette(selectedColor, 'tetradic');
    monochromatic = getHarmonyPalette(selectedColor, 'monochromatic');
  }

  return (
    <div className="container py-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-300"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back
      </button>
      
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold md:text-4xl">{palette.title}</h1>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleFavoriteToggle}
              className={`btn ${favorite ? 'btn-primary' : 'btn-outline'}`}
            >
              <Heart className={`mr-2 h-5 w-5 ${favorite ? 'fill-white' : ''}`} />
              {favorite ? 'Saved' : 'Save'}
            </button>
            
            <button onClick={handleDownload} className="btn btn-outline">
              <Download className="mr-2 h-5 w-5" />
              Download
            </button>
            
            <button onClick={handleShare} className="btn btn-outline">
              <Share2 className="mr-2 h-5 w-5" />
              Share
            </button>
          </div>
        </div>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {palette.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Created by <span className="font-medium">{palette.creator}</span> on {formattedDate}
        </div>
      </div>
      
      <div className="mb-8 flex h-48 overflow-hidden rounded-lg shadow-md sm:h-64 md:h-80">
        {palette.colors.map((color, index) => (
          <div
            key={index}
            className="flex-1 transition-all hover:flex-[1.2]"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
      
      <div className="mb-8">
        <div className="mb-4 flex space-x-4 border-b border-gray-200 dark:border-gray-800">
          <button
            className={`border-b-2 px-4 py-2 font-medium ${
              activeTab === 'colors'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('colors')}
          >
            Colors
          </button>
          <button
            className={`border-b-2 px-4 py-2 font-medium ${
              activeTab === 'harmonies'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('harmonies')}
          >
            Color Harmonies
          </button>
        </div>
        
        {activeTab === 'colors' ? (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Colors</h2>
              <button 
                onClick={copyCSS}
                className="btn btn-outline text-sm"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy CSS Variables
                  </>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {palette.colors.map((color, index) => (
                <div key={index} className="flex flex-col items-center">
                  <ColorSwatch 
                    color={color} 
                    index={index} 
                    size="lg" 
                    showHex={true}
                    showName={true}
                  />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Click to copy
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="mb-4 text-xl font-bold">Select a Color</h2>
              <div className="flex flex-wrap gap-4">
                {palette.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`h-12 w-12 rounded-md ${
                      selectedColor === color.hex ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.hex)}
                    aria-label={`Select ${color.hex}`}
                  />
                ))}
              </div>
            </div>
            
            {selectedColor && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Analogous</h3>
                  <div className="flex flex-wrap gap-4">
                    {analogous.map((color, index) => (
                      <div
                        key={index}
                        className="h-16 w-16 rounded-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Complementary</h3>
                  <div className="flex flex-wrap gap-4">
                    {complementary.map((color, index) => (
                      <div
                        key={index}
                        className="h-16 w-16 rounded-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Triadic</h3>
                  <div className="flex flex-wrap gap-4">
                    {triadic.map((color, index) => (
                      <div
                        key={index}
                        className="h-16 w-16 rounded-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Tetradic</h3>
                  <div className="flex flex-wrap gap-4">
                    {tetradic.map((color, index) => (
                      <div
                        key={index}
                        className="h-16 w-16 rounded-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Monochromatic</h3>
                  <div className="flex flex-wrap gap-4">
                    {monochromatic.map((color, index) => (
                      <div
                        key={index}
                        className="h-16 w-16 rounded-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Share this Palette</h2>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-outline">
            <Instagram className="mr-2 h-5 w-5" />
            Instagram
          </button>
          <button className="btn btn-outline">
            <Twitter className="mr-2 h-5 w-5" />
            Twitter
          </button>
          <button className="btn btn-outline">
            <Facebook className="mr-2 h-5 w-5" />
            Facebook
          </button>
          <button className="btn btn-outline" onClick={handleShare}>
            <Link className="mr-2 h-5 w-5" />
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default PalettePage;