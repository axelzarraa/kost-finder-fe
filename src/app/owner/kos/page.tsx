'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Home, Edit, Trash2, PlusCircle } from 'lucide-react';

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

  const handleEdit = (kos: Kos) => setForm(kos);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Home className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-black">Kelola Kamar Kos</h1>
        </div>

        {/* Form Input */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-md mb-10 transition hover:shadow-lg"
        >
          <h2 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-blue-600" />
            {form.id === 0 ? 'Tambah Kos Baru' : 'Edit Data Kos'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama Kos"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
              required
            />
            <input
              type="text"
              placeholder="Alamat"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
              required
            />
            <input
              type="number"
              placeholder="Harga per bulan"
              value={form.price_per_month}
              onChange={(e) =>
                setForm({ ...form, price_per_month: Number(e.target.value) })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
              required
            />
            <select
              value={form.gender}
              onChange={(e) =>
                setForm({ ...form, gender: e.target.value as 'male' | 'female' | 'all' })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
            >
              <option value="all">Semua</option>
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
          >
            {form.id === 0 ? 'Tambah Kos' : 'Update Kos'}
          </button>
        </form>

        {/* Daftar Kos */}
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-black mb-4">Daftar Kos</h2>

          {kosList.length === 0 ? (
            <p className="text-black italic">Belum ada data kos yang terdaftar.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {kosList.map((kos) => (
                <div
                  key={kos.id}
                  className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-black">{kos.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-black">
                      {kos.gender === 'all'
                        ? 'Campur'
                        : kos.gender === 'male'
                        ? 'Laki-laki'
                        : 'Perempuan'}
                    </span>
                  </div>
                  <p className="text-black">{kos.address}</p>
                  <p className="text-black font-semibold mt-2">
                    Rp {kos.price_per_month.toLocaleString()} / bulan
                  </p>

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={() => handleEdit(kos)}
                      className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(kos.id)}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}