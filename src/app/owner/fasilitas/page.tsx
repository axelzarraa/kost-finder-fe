'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Facility {
  id: number;
  kos_id: number;
  fasility: string;
}

export default function FasilitasPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [kosId, setKosId] = useState('');
  const [newFacility, setNewFacility] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchFacilities = async () => {
    try {
      const res = await axios.get('https://api-kamu.com/owner/fasilitas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFacilities(res.data);
    } catch {
      setError('Gagal mengambil data fasilitas.');
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleAdd = async () => {
    if (!kosId || !newFacility) {
      setError('Mohon isi semua kolom.');
      return;
    }
    try {
      await axios.post(
        'https://api-kamu.com/owner/fasilitas',
        { kos_id: kosId, fasility: newFacility },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Fasilitas berhasil ditambahkan!');
      setError('');
      setNewFacility('');
      fetchFacilities();
    } catch {
      setError('Gagal menambahkan fasilitas.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://api-kamu.com/owner/fasilitas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFacilities();
    } catch {
      setError('Gagal menghapus fasilitas.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4 font-poppins">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center text-black">Kelola Fasilitas Kos</h1>

        {error && <p className="text-red-500 mb-2 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 mb-2 text-sm text-center">{success}</p>}

        <div className="mb-4">
          <input
            type="text"
            placeholder="ID Kos"
            value={kosId}
            onChange={(e) => setKosId(e.target.value)}
            className="w-full p-2 border rounded mb-2 text-black"
          />
          <input
            type="text"
            placeholder="Nama Fasilitas"
            value={newFacility}
            onChange={(e) => setNewFacility(e.target.value)}
            className="w-full p-2 border rounded mb-3 text-black"
          />
          <button
            onClick={handleAdd}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Tambah
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 border-b pb-1 text-black">Daftar Fasilitas</h2>
          {facilities.length === 0 ? (
            <p className="text-black text-sm">Belum ada fasilitas.</p>
          ) : (
            <ul className="divide-y">
              {facilities.map((fasilitas) => (
                <li key={fasilitas.id} className="py-2 flex justify-between items-center">
                  <span className="text-black text-sm">
                    {fasilitas.fasility}{' '}
                    <span className="text-black/70">(ID: {fasilitas.kos_id})</span>
                  </span>
                  <button
                    onClick={() => handleDelete(fasilitas.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}