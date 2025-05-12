import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search palettes...',
}) => {
  const [query, setQuery] = useState(value);
  
  // Update internal state when the external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onChange(e.target.value);
  };
  
  const clearSearch = () => {
    setQuery('');
    onChange('');
  };
  
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="input pl-10 pr-10"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
      {query && (
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
          onClick={clearSearch}
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;