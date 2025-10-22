'use client';

import Link from 'next/link';
import { Home, Building2, Calendar, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <Home className="w-6 h-6 text-white" />
        <h1 className="text-2xl font-bold tracking-tight">KostKu</h1>
      </div>

      {/* NAVIGATION */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link href="/kos" className="flex items-center gap-1 hover:text-blue-200 transition">
          <Building2 className="w-4 h-4" /> <span>Kos</span>
        </Link>
        <Link href="/booking" className="flex items-center gap-1 hover:text-blue-200 transition">
          <Calendar className="w-4 h-4" /> <span>Booking</span>
        </Link>
        <Link href="/owner/dashboard" className="flex items-center gap-1 hover:text-blue-200 transition">
          <User className="w-4 h-4" /> <span>Owner</span>
        </Link>
        <Link href="/login" className="flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition">
          <span>Login</span>
        </Link>
      </nav>

      {/* MOBILE MENU (optional untuk ke depan) */}
      <div className="md:hidden">
        <button className="p-2 rounded hover:bg-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
