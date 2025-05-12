import * as tf from '@tensorflow/tfjs';

export const extractColors = async (imageData: ImageData, numColors: number = 6): Promise<string[]> => {
  // Convert ImageData to tensor
  const pixels = tf.browser.fromPixels(imageData);
  
  // Reshape the tensor to 2D array of pixels
  const reshapedPixels = pixels.reshape([-1, 3]);
  
  // Normalize pixel values
  const normalizedPixels = reshapedPixels.div(255);
  
  // Run k-means clustering
  const points = await normalizedPixels.array();
  const { centroids } = await kmeans(points, numColors);
  
  // Convert centroids back to hex colors
  const hexColors = centroids.map((centroid: number[]) => {
    const r = Math.round(centroid[0] * 255);
    const g = Math.round(centroid[1] * 255);
    const b = Math.round(centroid[2] * 255);
    return rgbToHex(r, g, b);
  });
  
  // Clean up tensors
  tf.dispose([pixels, reshapedPixels, normalizedPixels]);
  
  return hexColors;
};

const kmeans = async (points: number[][], k: number, maxIterations: number = 50) => {
  // Initialize centroids randomly
  let centroids = Array.from({ length: k }, () => {
    return Array.from({ length: 3 }, () => Math.random());
  });
  
  let oldCentroids = [];
  let iterations = 0;
  
  while (iterations < maxIterations) {
    // Assign points to nearest centroid
    const clusters = Array.from({ length: k }, () => [] as number[][]);
    
    points.forEach(point => {
      let minDist = Infinity;
      let clusterIndex = 0;
      
      centroids.forEach((centroid, i) => {
        const dist = euclideanDistance(point, centroid);
        if (dist < minDist) {
          minDist = dist;
          clusterIndex = i;
        }
      });
      
      clusters[clusterIndex].push(point);
    });
    
    // Store old centroids
    oldCentroids = [...centroids];
    
    // Update centroids
    centroids = clusters.map(cluster => {
      if (cluster.length === 0) return Array(3).fill(Math.random());
      
      const sum = cluster.reduce((acc, point) => {
        return acc.map((val, i) => val + point[i]);
      }, Array(3).fill(0));
      
      return sum.map(val => val / cluster.length);
    });
    
    // Check convergence
    if (centroidsEqual(oldCentroids, centroids)) break;
    
    iterations++;
  }
  
  return { centroids, iterations };
};

const euclideanDistance = (a: number[], b: number[]) => {
  return Math.sqrt(
    a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
  );
};

const centroidsEqual = (a: number[][], b: number[][]) => {
  const threshold = 0.0001;
  return a.every((centroid, i) => 
    centroid.every((val, j) => Math.abs(val - b[i][j]) < threshold)
  );
};

const rgbToHex = (r: number, g: number, b: number) => {
  return `#${[r, g, b]
    .map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, '0'))
    .join('')}`;
};

export const getImageMood = (colors: string[]): string[] => {
  const moods: string[] = [];
  
  // Calculate average brightness and saturation
  const hslColors = colors.map(color => {
    const rgb = hexToRgb(color);
    return rgbToHsl(rgb.r, rgb.g, rgb.b);
  });
  
  const avgBrightness = hslColors.reduce((sum, hsl) => sum + hsl.l, 0) / hslColors.length;
  const avgSaturation = hslColors.reduce((sum, hsl) => sum + hsl.s, 0) / hslColors.length;
  
  // Analyze color relationships
  if (avgBrightness > 70) moods.push('Light');
  if (avgBrightness < 30) moods.push('Dark');
  if (avgSaturation > 70) moods.push('Vibrant');
  if (avgSaturation < 30) moods.push('Muted');
  
  // Check for specific color combinations
  const hasWarmColors = hslColors.some(hsl => (hsl.h >= 0 && hsl.h <= 60) || hsl.h >= 300);
  const hasCoolColors = hslColors.some(hsl => hsl.h > 180 && hsl.h < 300);
  
  if (hasWarmColors && !hasCoolColors) moods.push('Warm');
  if (hasCoolColors && !hasWarmColors) moods.push('Cool');
  if (hasWarmColors && hasCoolColors) moods.push('Balanced');
  
  // Add aesthetic moods based on color combinations
  if (avgSaturation > 60 && avgBrightness > 60) moods.push('Tropical');
  if (avgSaturation < 40 && avgBrightness > 60) moods.push('Minimal');
  if (avgSaturation > 50 && avgBrightness < 50) moods.push('Rich');
  
  return [...new Set(moods)];
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    
    h /= 6;
  }
  
  return {
    h: h * 360,
    s: s * 100,
    l: l * 100
  };
};