import { useState, useEffect } from 'react';
import { debounce } from '../utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const debouncedSearch = debounce(onSearch, 300);
    debouncedSearch(query);
  }, [query, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="search-input"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="search-clear"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
