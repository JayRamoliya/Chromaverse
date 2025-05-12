import React from 'react';
import { X } from 'lucide-react';
import { tags } from '../data/mockData';

interface TagFilterProps {
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  className?: string;
}

const TagFilter: React.FC<TagFilterProps> = ({ 
  selectedTags, 
  onTagSelect, 
  onTagRemove,
  className = ''
}) => {
  return (
    <div className={`${className}`}>
      <div className="mb-2 flex flex-wrap gap-2">
        {selectedTags.map(tag => (
          <div 
            key={tag}
            className="flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200"
          >
            {tag}
            <button 
              onClick={() => onTagRemove(tag)}
              className="ml-1 rounded-full p-1 hover:bg-primary-200 dark:hover:bg-primary-800"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags
          .filter(tag => !selectedTags.includes(tag))
          .map(tag => (
            <button
              key={tag}
              onClick={() => onTagSelect(tag)}
              className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {tag}
            </button>
          ))}
      </div>
    </div>
  );
};

export default TagFilter;