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

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchFacilities = async () => {
    try {
      const res = await axios.get('https://api-kamu.com/owner/fasilitas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFacilities(res.data);
    } catch (err) {
      console.error('Gagal mengambil data fasilitas');
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleAdd = async () => {
    try {
      await axios.post(
        'https://api-kamu.com/owner/fasilitas',
        { kos_id: kosId, fasility: newFacility },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewFacility('');
      fetchFacilities();
    } catch (err) {
      console.error('Gagal menambahkan fasilitas');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://api-kamu.com/owner/fasilitas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFacilities();
    } catch (err) {
      console.error('Gagal menghapus fasilitas');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kelola Fasilitas Kos</h1>

      <div className="mb-6 bg-white p-4 rounded shadow-md max-w-md">
        <h2 className="text-lg font-semibold mb-2">Tambah Fasilitas</h2>
        <input
          type="text"
          placeholder="ID Kos"
          value={kosId}
          onChange={(e) => setKosId(e.target.value)}
          className="w-full p-2 border mb-2"
        />
        <input
          type="text"
          placeholder="Nama Fasilitas"
          value={newFacility}
          onChange={(e) => setNewFacility(e.target.value)}
          className="w-full p-2 border mb-2"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">
          Tambah
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2">Daftar Fasilitas</h2>
        <ul className="list-disc ml-6">
          {facilities.map((fasilitas) => (
            <li key={fasilitas.id} className="mb-2 flex justify-between items-center">
              <span>{fasilitas.fasility} (Kos ID: {fasilitas.kos_id})</span>
              <button
                onClick={() => handleDelete(fasilitas.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}