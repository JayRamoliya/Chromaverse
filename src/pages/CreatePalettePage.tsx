import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HexColorPicker } from 'react-colorful';
import { 
  Plus, Trash2, RefreshCw, Save, Shuffle, ArrowRight,
  Upload, X 
} from 'lucide-react';
import { usePalettes } from '../context/PaletteContext';
import { Color } from '../types/palette';
import { tags } from '../data/mockData';
import { generateRandomPalette } from '../utils/colorUtils';
import toast from 'react-hot-toast';

const MAX_COLORS = 8;
const MIN_COLORS = 2;

const CreatePalettePage: React.FC = () => {
  const navigate = useNavigate();
  const { createPalette } = usePalettes();
  
  const [title, setTitle] = useState('My New Palette');
  const [colors, setColors] = useState<Color[]>(generateRandomPalette(4));
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  useEffect(() => {
    document.title = 'Create Palette - Chromaverse';
  }, []);
  
  const handleColorChange = (newColor: string) => {
    const updatedColors = [...colors];
    updatedColors[selectedColorIndex] = { ...updatedColors[selectedColorIndex], hex: newColor };
    setColors(updatedColors);
  };
  
  const handleAddColor = () => {
    if (colors.length < MAX_COLORS) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      setColors([...colors, { hex: randomColor }]);
      setSelectedColorIndex(colors.length);
    } else {
      toast.error(`Maximum of ${MAX_COLORS} colors allowed`);
    }
  };
  
  const handleRemoveColor = (index: number) => {
    if (colors.length > MIN_COLORS) {
      const newColors = colors.filter((_, i) => i !== index);
      setColors(newColors);
      setSelectedColorIndex(Math.min(selectedColorIndex, newColors.length - 1));
    } else {
      toast.error(`Minimum of ${MIN_COLORS} colors required`);
    }
  };
  
  const handleRegenerateColor = (index: number) => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    const newColors = [...colors];
    newColors[index] = { hex: randomColor };
    setColors(newColors);
  };
  
  const handleRandomizePalette = () => {
    setColors(generateRandomPalette(colors.length));
  };
  
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        toast.error('Maximum 5 tags allowed');
      }
    }
  };
  
  const handleUpdateColorName = (index: number, name: string) => {
    const updatedColors = [...colors];
    updatedColors[index] = { ...updatedColors[index], name };
    setColors(updatedColors);
  };
  
  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Please enter a title for your palette');
      return;
    }
    
    const paletteId = createPalette({
      title,
      colors,
      tags: selectedTags,
      creator: 'You', // In a real app, this would be the current user
    });
    
    toast.success('Palette saved successfully!');
    navigate(`/palette/${paletteId}`);
  };
  
  const handleImageUpload = () => {
    // In a real app, this would handle image upload and color extraction
    toast.error('Image upload feature coming soon!');
  };

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Create Your Palette</h1>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-6">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Palette Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Enter a name for your palette"
            />
          </div>
          
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Colors</h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleRandomizePalette}
                  className="btn btn-outline text-sm"
                >
                  <Shuffle className="mr-1 h-4 w-4" />
                  Randomize All
                </button>
                
                <button
                  onClick={handleImageUpload}
                  className="btn btn-outline text-sm"
                >
                  <Upload className="mr-1 h-4 w-4" />
                  Extract from Image
                </button>
              </div>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              {colors.map((color, index) => (
                <div 
                  key={index}
                  className={`relative rounded-md border p-2 transition-all hover:shadow-md ${
                    selectedColorIndex === index ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  <div
                    className="mb-2 h-16 w-full cursor-pointer rounded"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColorIndex(index)}
                  />
                  
                  <div className="mb-2 flex">
                    <input
                      type="text"
                      value={color.hex}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="input font-mono text-sm"
                      onClick={() => setSelectedColorIndex(index)}
                    />
                  </div>
                  
                  <input
                    type="text"
                    value={color.name || ''}
                    onChange={(e) => handleUpdateColorName(index, e.target.value)}
                    className="input mb-2 text-sm"
                    placeholder="Color name (optional)"
                  />
                  
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleRegenerateColor(index)}
                      className="btn btn-outline flex-1 px-2 py-1 text-xs"
                      title="Regenerate color"
                    >
                      <RefreshCw className="h-3 w-3" />
                    </button>
                    
                    <button
                      onClick={() => handleRemoveColor(index)}
                      className="btn btn-outline flex-1 px-2 py-1 text-xs text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900"
                      title="Remove color"
                      disabled={colors.length <= MIN_COLORS}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
              
              {colors.length < MAX_COLORS && (
                <button
                  onClick={handleAddColor}
                  className="flex h-[152px] items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-2 transition-colors hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600"
                >
                  <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                    <Plus className="mb-1 h-6 w-6" />
                    <span className="text-sm">Add Color</span>
                  </div>
                </button>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Tags</h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Select up to 5 tags that describe your palette (optional)
            </p>
            
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`rounded-full px-3 py-1 text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {tag}
                  {selectedTags.includes(tag) && (
                    <X className="ml-1 inline h-3 w-3" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="btn btn-primary"
            >
              <Save className="mr-2 h-5 w-5" />
              Save Palette
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </div>
        
        <div>
          <div className="sticky top-24">
            <h2 className="mb-4 text-lg font-semibold">Preview</h2>
            
            <div className="overflow-hidden rounded-lg border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800">
              <div className="flex h-24">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
              
              <div className="p-4">
                <h3 className="text-md font-medium">{title || 'Untitled Palette'}</h3>
                
                {selectedTags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {selectedTags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium">Color Editor</h4>
                  
                  {colors[selectedColorIndex] && (
                    <div className="space-y-4">
                      <HexColorPicker
                        color={colors[selectedColorIndex].hex}
                        onChange={handleColorChange}
                        className="w-full"
                      />
                      
                      <div
                        className="h-12 w-full rounded"
                        style={{ backgroundColor: colors[selectedColorIndex].hex }}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                <button
                  onClick={handleSave}
                  className="btn btn-primary w-full"
                >
                  Save and Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePalettePage;