'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'society' | 'owner'>('society');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('https://api-kamu.com/register', {
        name,
        email,
        password,
        phone,
        role,
      });
      router.push('/login');
    } catch (err) {
      setError('Registrasi gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-blue-50 rounded-full">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-black">
            Daftar Akun KostKu
          </h2>
          <p className="text-sm text-black mt-1">
            Temukan atau kelola kos impianmu sekarang.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div>
            <label className="text-sm text-black block mb-1">
              Daftar sebagai
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'society' | 'owner')}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-200 outline-none"
            >
              <option value="society">Pencari Kos</option>
              <option value="owner">Pemilik Kos</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-black block mb-1">Nama</label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-200 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-black block mb-1">Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-200 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-black block mb-1">Password</label>
            <input
              type="password"
              placeholder="Buat password"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-200 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-black block mb-1">No. HP</label>
            <input
              type="text"
              placeholder="Contoh: 08123456789"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-200 outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded-lg font-medium text-white transition ${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
          </button>

          <p className="text-center text-sm text-black mt-3">
            Sudah punya akun?{' '}
            <span
              onClick={() => router.push('/login')}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Masuk di sini
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
