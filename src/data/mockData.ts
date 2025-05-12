import { Palette } from '../types/palette';

const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 15);
};

// Generate a random date within the last 30 days
const generateRandomDate = () => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  return new Date(
    thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime())
  );
};

export const tags = [
  'Warm', 'Cool', 'Pastel', 'Vibrant', 'Dark', 'Light', 'Neon', 'Earthy',
  'Monochrome', 'Gradient', 'Retro', 'Modern', 'Autumn', 'Winter', 'Spring', 'Summer'
];

export const mockPalettes: Palette[] = [
  {
    id: '1',
    title: 'Sunset Vibes',
    colors: [
      { hex: '#FF9E7D', name: 'Peach' },
      { hex: '#FF5757', name: 'Coral' },
      { hex: '#B32E2E', name: 'Rust' },
      { hex: '#4D1818', name: 'Maroon' }
    ],
    tags: ['Warm', 'Vibrant', 'Sunset'],
    creator: 'ColorMaster',
    created: generateRandomDate(),
    likes: 243,
    downloads: 89
  },
  {
    id: '2',
    title: 'Ocean Breeze',
    colors: [
      { hex: '#8AEAFF', name: 'Sky Blue' },
      { hex: '#5BC0EB', name: 'Cerulean' },
      { hex: '#3A7CA5', name: 'Steel Blue' },
      { hex: '#2F5A8B', name: 'Navy' }
    ],
    tags: ['Cool', 'Blue', 'Ocean'],
    creator: 'WaveDesigner',
    created: generateRandomDate(),
    likes: 187,
    downloads: 63
  },
  {
    id: '3',
    title: 'Forest Whispers',
    colors: [
      { hex: '#CAD2C5', name: 'Mint Cream' },
      { hex: '#84A98C', name: 'Sage' },
      { hex: '#52796F', name: 'Hooker Green' },
      { hex: '#354F52', name: 'Dark Slate' }
    ],
    tags: ['Earthy', 'Green', 'Forest'],
    creator: 'NatureLover',
    created: generateRandomDate(),
    likes: 156,
    downloads: 42
  },
  {
    id: '4',
    title: 'Berry Smoothie',
    colors: [
      { hex: '#FFC2D1', name: 'Pink' },
      { hex: '#FF9EAF', name: 'Salmon' },
      { hex: '#C74B50', name: 'Auburn' },
      { hex: '#880D1E', name: 'Wine' }
    ],
    tags: ['Warm', 'Pastel', 'Pink'],
    creator: 'FruitPunch',
    created: generateRandomDate(),
    likes: 321,
    downloads: 98
  },
  {
    id: '5',
    title: 'Midnight Dream',
    colors: [
      { hex: '#2B2D42', name: 'Space Blue' },
      { hex: '#8D99AE', name: 'Blue Gray' },
      { hex: '#EDF2F4', name: 'Anti-Flash White' },
      { hex: '#EF233C', name: 'Imperial Red' }
    ],
    tags: ['Dark', 'Cool', 'Modern'],
    creator: 'NightOwl',
    created: generateRandomDate(),
    likes: 275,
    downloads: 104
  },
  {
    id: '6',
    title: 'Citrus Splash',
    colors: [
      { hex: '#FFF07C', name: 'Canary' },
      { hex: '#F5CB5C', name: 'Maize' },
      { hex: '#E09F3E', name: 'Yellow Ochre' },
      { hex: '#9E2A2B', name: 'Barn Red' }
    ],
    tags: ['Warm', 'Vibrant', 'Summer'],
    creator: 'JuicyDesigns',
    created: generateRandomDate(),
    likes: 198,
    downloads: 67
  },
  {
    id: '7',
    title: 'Lavender Fields',
    colors: [
      { hex: '#E0B1CB', name: 'Pink Lavender' },
      { hex: '#BE95C4', name: 'African Violet' },
      { hex: '#9F86C0', name: 'Blue Bell' },
      { hex: '#5E548E', name: 'Ultra Violet' }
    ],
    tags: ['Cool', 'Pastel', 'Purple'],
    creator: 'FlowerPower',
    created: generateRandomDate(),
    likes: 276,
    downloads: 81
  },
  {
    id: '8',
    title: 'Desert Storm',
    colors: [
      { hex: '#F9DCC4', name: 'Champagne' },
      { hex: '#FEC89A', name: 'Peach Crayola' },
      { hex: '#C1A68B', name: 'Khaki' },
      { hex: '#8A7968', name: 'Beaver' }
    ],
    tags: ['Warm', 'Earthy', 'Neutral'],
    creator: 'SandArtist',
    created: generateRandomDate(),
    likes: 134,
    downloads: 52
  },
  {
    id: '9',
    title: 'Neon Nights',
    colors: [
      { hex: '#F72585', name: 'Fluorescent Pink' },
      { hex: '#7209B7', name: 'Purple' },
      { hex: '#3A0CA3', name: 'Ultramarine' },
      { hex: '#4361EE', name: 'Royal Blue' }
    ],
    tags: ['Vibrant', 'Neon', 'Dark'],
    creator: 'CyberPunk',
    created: generateRandomDate(),
    likes: 354,
    downloads: 127
  },
  {
    id: '10',
    title: 'Vintage Paper',
    colors: [
      { hex: '#F8F9FA', name: 'Cultured' },
      { hex: '#E9ECEF', name: 'Anti-Flash White' },
      { hex: '#DEE2E6', name: 'Gainsboro' },
      { hex: '#CED4DA', name: 'Light Gray' }
    ],
    tags: ['Light', 'Monochrome', 'Minimal'],
    creator: 'MinimalistMuse',
    created: generateRandomDate(),
    likes: 112,
    downloads: 43
  },
  {
    id: '11',
    title: 'Autumn Leaves',
    colors: [
      { hex: '#E76F51', name: 'Fire Opal' },
      { hex: '#F4A261', name: 'Sandy Brown' },
      { hex: '#E9C46A', name: 'Hansa Yellow' },
      { hex: '#264653', name: 'Charcoal' }
    ],
    tags: ['Warm', 'Earthy', 'Autumn'],
    creator: 'SeasonalDesigner',
    created: generateRandomDate(),
    likes: 289,
    downloads: 94
  },
  {
    id: '12',
    title: 'Winter Frost',
    colors: [
      { hex: '#FFFFFF', name: 'White' },
      { hex: '#CAF0F8', name: 'Light Cyan' },
      { hex: '#90E0EF', name: 'Non Photo Blue' },
      { hex: '#00B4D8', name: 'Pacific Cyan' }
    ],
    tags: ['Cool', 'Light', 'Winter'],
    creator: 'SnowQueen',
    created: generateRandomDate(),
    likes: 201,
    downloads: 76
  }
];

// Create more mock palettes
for (let i = 0; i < 20; i++) {
  const id = generateRandomId();
  const randomTags = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
    tags[Math.floor(Math.random() * tags.length)]
  );
  
  // Ensure unique tags
  const uniqueTags = [...new Set(randomTags)];
  
  mockPalettes.push({
    id,
    title: `Color Palette ${mockPalettes.length + 1}`,
    colors: [
      { hex: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}` },
      { hex: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}` },
      { hex: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}` },
      { hex: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}` }
    ],
    tags: uniqueTags,
    creator: `User${Math.floor(Math.random() * 100)}`,
    created: generateRandomDate(),
    likes: Math.floor(Math.random() * 300),
    downloads: Math.floor(Math.random() * 100)
  });
}