'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Kos {
  id: number;
  name: string;
  address: string;
  price_per_month: number;
  gender: 'male' | 'female' | 'all';
}

export default function OwnerKosPage() {
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [form, setForm] = useState<Kos>({
    id: 0,
    name: '',
    address: '',
    price_per_month: 0,
    gender: 'all',
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchKos = async () => {
    try {
      const res = await axios.get('https://api-kamu.com/owner/kos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setKosList(res.data);
    } catch (err) {
      console.error('Gagal mengambil data kos');
    }
  };

  useEffect(() => {
    fetchKos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.id === 0) {
        await axios.post('https://api-kamu.com/owner/kos', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.put(`https://api-kamu.com/owner/kos/${form.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ id: 0, name: '', address: '', price_per_month: 0, gender: 'all' });
      fetchKos();
    } catch (err) {
      console.error('Gagal menyimpan data kos');
    }
  };

  const handleEdit = (kos: Kos) => {
    setForm(kos);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://api-kamu.com/owner/kos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchKos();
    } catch (err) {
      console.error('Gagal menghapus kos');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kelola Kamar Kos</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-md mb-6">
        <input
          type="text"
          placeholder="Nama Kos"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="text"
          placeholder="Alamat"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="number"
          placeholder="Harga per bulan"
          value={form.price_per_month}
          onChange={(e) => setForm({ ...form, price_per_month: Number(e.target.value) })}
          className="w-full p-2 border mb-2"
          required
        />
        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value as 'male' | 'female' | 'all' })}
          className="w-full p-2 border mb-2"
        >
          <option value="all">Semua</option>
          <option value="male">Laki-laki</option>
          <option value="female">Perempuan</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {form.id === 0 ? 'Tambah Kos' : 'Update Kos'}
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2">Daftar Kos</h2>
        <ul className="list-disc ml-6">
          {kosList.map((kos) => (
            <li key={kos.id} className="mb-2 flex justify-between items-center">
              <div>
                <p className="font-bold">{kos.name}</p>
                <p>{kos.address}</p>
                <p>Rp {kos.price_per_month.toLocaleString()} / bulan</p>
                <p>Gender: {kos.gender}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(kos)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(kos.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}