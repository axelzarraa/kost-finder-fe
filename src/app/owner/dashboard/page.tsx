'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function OwnerDashboard() {
  const [summary, setSummary] = useState({
    totalKos: 0,
    totalBooking: 0,
    recentReviews: [],
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://api-kamu.com/owner/summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(res.data);
      } catch (err) {
        console.error('Gagal mengambil data ringkasan');
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Owner</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Kos</h2>
          <p className="text-3xl">{summary.totalKos}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Booking</h2>
          <p className="text-3xl">{summary.totalBooking}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Review Terbaru</h2>
          <ul className="mt-2 list-disc ml-4">
            {summary.recentReviews.map((review: any, i: number) => (
              <li key={i}>{review.comment}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/owner/kos">
          <div className="bg-blue-500 text-white p-4 rounded text-center hover:bg-blue-600">
            Kelola Kamar Kos
          </div>
        </Link>
        <Link href="/owner/fasilitas">
          <div className="bg-green-500 text-white p-4 rounded text-center hover:bg-green-600">
            Kelola Fasilitas
          </div>
        </Link>
        <Link href="/owner/reviews">
          <div className="bg-yellow-500 text-white p-4 rounded text-center hover:bg-yellow-600">
            Balas Review
          </div>
        </Link>
        <Link href="/owner/transaksi">
          <div className="bg-purple-500 text-white p-4 rounded text-center hover:bg-purple-600">
            Histori Transaksi
          </div>
        </Link>
      </div>
    </div>
  );
}