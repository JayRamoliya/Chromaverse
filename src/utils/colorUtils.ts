export const hexToRgb = (hex: string) => {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return { r, g, b };
};

export const rgbToHex = (r: number, g: number, b: number) => {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

export const hexToHsl = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  
  // Convert RGB to HSL
  const rNormalized = r / 255;
  const gNormalized = g / 255;
  const bNormalized = b / 255;
  
  const max = Math.max(rNormalized, gNormalized, bNormalized);
  const min = Math.min(rNormalized, gNormalized, bNormalized);
  
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case rNormalized:
        h = (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0);
        break;
      case gNormalized:
        h = (bNormalized - rNormalized) / d + 2;
        break;
      case bNormalized:
        h = (rNormalized - gNormalized) / d + 4;
        break;
    }
    
    h /= 6;
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export const hslToHex = (h: number, s: number, l: number) => {
  // Normalize values
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return rgbToHex(
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  );
};

export const getContrastColor = (hexColor: string) => {
  // Convert hex to RGB
  const { r, g, b } = hexToRgb(hexColor);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export const getHarmonyPalette = (hex: string, type: 'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'monochromatic') => {
  const { h, s, l } = hexToHsl(hex);
  
  switch (type) {
    case 'analogous':
      return [
        hslToHex((h - 30 + 360) % 360, s, l),
        hex,
        hslToHex((h + 30) % 360, s, l),
      ];
    
    case 'complementary':
      return [
        hex,
        hslToHex((h + 180) % 360, s, l),
      ];
    
    case 'triadic':
      return [
        hex,
        hslToHex((h + 120) % 360, s, l),
        hslToHex((h + 240) % 360, s, l),
      ];
    
    case 'tetradic':
      return [
        hex,
        hslToHex((h + 90) % 360, s, l),
        hslToHex((h + 180) % 360, s, l),
        hslToHex((h + 270) % 360, s, l),
      ];
    
    case 'monochromatic':
      return [
        hslToHex(h, s, Math.max(0, l - 30)),
        hslToHex(h, s, Math.max(0, l - 15)),
        hex,
        hslToHex(h, s, Math.min(100, l + 15)),
        hslToHex(h, s, Math.min(100, l + 30)),
      ];
    
    default:
      return [hex];
  }
};

export const generateRandomPalette = (count = 4) => {
  const colors = [];
  
  for (let i = 0; i < count; i++) {
    const hex = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    colors.push({ hex });
  }
  
  return colors;
};