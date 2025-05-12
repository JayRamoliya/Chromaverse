import React from 'react';
import { SortOption } from '../types/palette';

interface SortSelectorProps {
  value: SortOption;
  onChange: (option: SortOption) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center">
      <label htmlFor="sort-options" className="mr-2 text-sm font-medium">
        Sort by:
      </label>
      <select
        id="sort-options"
        className="input h-auto py-1"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        <option value="newest">Newest</option>
        <option value="popular">Most Popular</option>
        <option value="downloads">Most Downloads</option>
      </select>
    </div>
  );
};

export default SortSelector;