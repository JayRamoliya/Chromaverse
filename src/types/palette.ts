export interface Color {
  hex: string;
  name?: string;
}

export interface Palette {
  id: string;
  title: string;
  colors: Color[];
  tags: string[];
  creator: string;
  created: Date;
  likes: number;
  downloads: number;
}

export interface PaletteFilter {
  tags?: string[];
  search?: string;
  sortBy?: 'newest' | 'popular' | 'downloads';
}

export type SortOption = 'newest' | 'popular' | 'downloads';