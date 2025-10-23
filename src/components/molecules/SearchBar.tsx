import React from 'react';
import { Icon } from '@iconify/react';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Cari...',
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center bg-white border border-gray-200 rounded-xl px-3 shadow-sm hover:shadow-md transition ${className}`}>
      <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="ml-2 p-2 w-full focus:outline-none text-gray-700"
      />
    </div>
  );
};

export default SearchBar;