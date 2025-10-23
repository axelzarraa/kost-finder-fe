'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Home, BookOpen, Star, History } from 'lucide-react';

export default function OwnerDashboard() {
  const [summary, setSummary] = useState({
    totalKos: 0,
    totalBooking: 0,
    recentReviews: [] as { comment: string }[],
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://api-kamu.com/owner/summary', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(res.data);
      } catch (err) {
        console.error('Gagal mengambil data ringkasan');
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200 p-6 md:p-10 font-[Poppins]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 drop-shadow-sm">
            Dashboard Pemilik KostKu 
          </h1>
          <p className="text-gray-600 mt-2">Kelola kosmu dengan mudah dan nyaman</p>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-gray-600 font-semibold mb-2">Total Kos</h2>
            <p className="text-5xl font-bold text-blue-600">{summary.totalKos}</p>
          </div>

          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-gray-600 font-semibold mb-2">Total Booking</h2>
            <p className="text-5xl font-bold text-green-600">{summary.totalBooking}</p>
          </div>

          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-gray-600 font-semibold mb-3">Review Terbaru</h2>
            <ul className="space-y-2 max-h-32 overflow-y-auto text-gray-700 text-sm pr-2">
              {summary.recentReviews.length > 0 ? (
                summary.recentReviews.map((review, i) => (
                  <li key={i} className="bg-gray-100/80 rounded-md p-2 hover:bg-gray-200 transition">
                    {review.comment}
                  </li>
                ))
              ) : (
                <p className="text-gray-400 italic">Belum ada review</p>
              )}
            </ul>
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link href="/owner/kos">
            <div className="group bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-md text-center hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer">
              <Home className="w-8 h-8 mx-auto mb-3 group-hover:animate-pulse" />
              <p className="font-semibold">Kelola Kamar Kos</p>
            </div>
          </Link>

          <Link href="/owner/fasilitas">
            <div className="group bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-md text-center hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer">
              <BookOpen className="w-8 h-8 mx-auto mb-3 group-hover:animate-pulse" />
              <p className="font-semibold">Kelola Fasilitas</p>
            </div>
          </Link>

          <Link href="/owner/reviews">
            <div className="group bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-md text-center hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer">
              <Star className="w-8 h-8 mx-auto mb-3 group-hover:animate-pulse" />
              <p className="font-semibold">Balas Review</p>
            </div>
          </Link>

          <Link href="/owner/transaksi">
            <div className="group bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow-md text-center hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer">
              <History className="w-8 h-8 mx-auto mb-3 group-hover:animate-pulse" />
              <p className="font-semibold">Histori Transaksi</p>
            </div>
          </Link>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-16">
          © {new Date().getFullYear()} <span className="font-medium text-gray-700">KostKu</span> Owner Dashboard — All rights reserved.
        </footer>
      </div>
    </div>
  );
}
