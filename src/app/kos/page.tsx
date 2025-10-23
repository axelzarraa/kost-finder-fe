'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import KosCard from '@/components/KosCard';
import { Search, Filter } from 'lucide-react';

interface Kos {
  id: number;
  name: string;
  address: string;
  price_per_month: number;
  gender: 'male' | 'female' | 'all';
}

export default function KosListPage() {
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKos = async () => {
      try {
        const res = await axios.get('https://api-kamu.com/kos');
        setKosList(res.data);
      } catch (err) {
        console.error('Gagal mengambil data kos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchKos();
  }, []);

  const filteredKos = kosList.filter((kos) => {
    const matchesSearch = kos.name.toLowerCase().includes(search.toLowerCase());
    const matchesGender =
      filterGender === 'all' ? true : kos.gender === filterGender;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Cari <span className="text-blue-600">Kos Impianmu</span> 🏠
          </h1>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 shadow-sm hover:shadow-md transition">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama kos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="ml-2 p-2 w-full focus:outline-none text-gray-700"
              />
            </div>

            {/* Filter Gender */}
            <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 shadow-sm hover:shadow-md transition">
              <Filter className="w-5 h-5 text-gray-400 mr-2" />
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="p-2 bg-transparent focus:outline-none text-gray-700"
              >
                <option value="all">Semua</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>
          </div>
        </div>

        {/* List Kos */}
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Memuat data kos...
          </p>
        ) : filteredKos.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg">Tidak ada kos yang cocok 🥺</p>
            <p className="text-sm text-gray-400">Coba ubah pencarianmu, ya!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredKos.map((kos) => (
              <KosCard key={kos.id} kos={kos} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
