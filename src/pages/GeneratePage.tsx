import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, Image as ImageIcon, Loader, RefreshCw,
  Download, Save, Share2, Trash2 
} from 'lucide-react';
import { usePalettes } from '../context/PaletteContext';
import { extractColors, getImageMood } from '../utils/imageUtils';
import toast from 'react-hot-toast';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp']
};

const GeneratePage: React.FC = () => {
  const navigate = useNavigate();
  const { createPalette } = usePalettes();
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [moods, setMoods] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file) return;
    
    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5MB');
      return;
    }
    
    setError(null);
    setIsProcessing(true);
    
    try {
      // Create image URL
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      
      // Load image and extract colors
      const img = new Image();
      img.src = imageUrl;
      
      img.onload = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Resize canvas to image dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image to canvas
        ctx.drawImage(img, 0, 0);
        
        // Get image data and extract colors
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const extractedColors = await extractColors(imageData);
        
        setColors(extractedColors);
        setMoods(getImageMood(extractedColors));
        setIsProcessing(false);
      };
      
      img.onerror = () => {
        setError('Failed to load image');
        setIsProcessing(false);
      };
    } catch (err) {
      setError('Failed to process image');
      setIsProcessing(false);
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxFiles: 1,
    multiple: false
  });
  
  const handleRegenerate = async () => {
    if (!canvasRef.current || !image) return;
    
    setIsProcessing(true);
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    const extractedColors = await extractColors(imageData);
    
    setColors(extractedColors);
    setMoods(getImageMood(extractedColors));
    setIsProcessing(false);
  };
  
  const handleSave = () => {
    if (colors.length === 0) return;
    
    const paletteId = createPalette({
      title: 'Generated Palette',
      colors: colors.map(hex => ({ hex })),
      tags: moods,
      creator: 'You'
    });
    
    toast.success('Palette saved successfully!');
    navigate(`/palette/${paletteId}`);
  };
  
  const handleClear = () => {
    setImage(null);
    setColors([]);
    setMoods([]);
    setError(null);
    
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };
  
  const handleDownload = () => {
    // In a real app, this would generate files in different formats
    toast.success('Palette downloaded');
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('URL copied to clipboard');
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Generate from Image</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Upload an image to extract a beautiful color palette using AI.
        </p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div
            {...getRootProps()}
            className={`relative mb-6 flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
              isDragActive
                ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/10'
                : 'border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600'
            }`}
          >
            <input {...getInputProps()} />
            
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="max-h-[300px] w-auto rounded object-contain"
              />
            ) : (
              <div className="text-center">
                <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <p className="mb-2 text-lg font-medium">
                  Drop your image here, or click to select
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  PNG, JPG or WebP (max. 5MB)
                </p>
              </div>
            )}
            
            {error && (
              <p className="mt-2 text-sm text-error-600 dark:text-error-400">
                {error}
              </p>
            )}
          </div>
          
          {image && (
            <div className="flex space-x-2">
              <button
                onClick={handleRegenerate}
                className="btn btn-outline"
                disabled={isProcessing}
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Regenerate
              </button>
              
              <button
                onClick={handleClear}
                className="btn btn-outline text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900"
              >
                <Trash2 className="mr-2 h-5 w-5" />
                Clear
              </button>
            </div>
          )}
        </div>
        
        <div>
          {isProcessing ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Loader className="mx-auto mb-4 h-8 w-8 animate-spin text-primary-500" />
                <p className="text-lg font-medium">Extracting Colors...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This may take a few seconds
                </p>
              </div>
            </div>
          ) : colors.length > 0 ? (
            <div>
              <div className="mb-6">
                <h2 className="mb-4 text-xl font-semibold">Generated Palette</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div
                        className="h-full w-full"
                        style={{ backgroundColor: color }}
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                        <p className="font-mono text-sm text-white">
                          {color.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {moods.length > 0 && (
                <div className="mb-6">
                  <h2 className="mb-2 text-lg font-semibold">Mood</h2>
                  <div className="flex flex-wrap gap-2">
                    {moods.map((mood, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      >
                        {mood}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3">
                <button onClick={handleSave} className="btn btn-primary">
                  <Save className="mr-2 h-5 w-5" />
                  Save Palette
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
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 dark:border-gray-700">
              <div className="text-center">
                <ImageIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <p className="text-lg font-medium">No Image Selected</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload an image to generate a palette
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default GeneratePage;