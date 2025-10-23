"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from '../../../components/molecules/SearchBar';
import Button from '../../../components/atom/button';
import Typography from '../../../components/atom/typografi';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <nav className={`bg-white shadow-md ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <Typography variant="h1" className="text-xl font-bold">
                Kost Finder
              </Typography>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar
              placeholder="Cari kos..."
              value={searchValue}
              onChange={handleSearchChange}
              className="w-64"
            />
            <Button variant="primary" size="sm">
              Masuk
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;