'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import KosCard from '@/components/KosCard';

interface Kos {
  id: number;
  name: string;
  address: string;
  price_per_month: number;
  gender: 'male' | 'female' | 'all';
}

export default function KosPage() {
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [filterGender, setFilterGender] = useState<'all' | 'male' | 'female'>('all');

  useEffect(() => {
    const fetchKos = async () => {
      try {
        const res = await axios.get('https://api-kamu.com/kos');
        setKosList(res.data);
      } catch (err) {
        console.error('Gagal mengambil data kos');
      }
    };
    fetchKos();
  }, []);

  const filteredKos = kosList.filter((kos) =>
    filterGender === 'all' ? true : kos.gender === filterGender
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Kos Tersedia</h1>

      <div className="mb-4">
        <label className="mr-2">Filter Gender:</label>
        <select
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value as 'all' | 'male' | 'female')}
          className="p-2 border rounded"
        >
          <option value="all">Semua</option>
          <option value="male">Laki-laki</option>
          <option value="female">Perempuan</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredKos.map((kos) => (
          <KosCard key={kos.id} kos={kos} />
        ))}
      </div>
    </div>
  );
}