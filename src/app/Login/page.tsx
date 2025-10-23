'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('https://api-kamu.com/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      if (res.data.role === 'owner') {
        router.push('/owner/dashboard');
      } else {
        router.push('/kos');
      }
    } catch (err) {
      setError('Login gagal. Cek email dan password kamu 😢');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-100 to-blue-50 font-poppins">
      {/* Kiri: Branding */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-blue-600 text-white p-10">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Selamat Datang di KostKu 🏠</h1>
          <p className="text-blue-100">
            Temukan dan kelola kos dengan mudah — dari pencarian hingga pemesanan, semua dalam satu platform.
          </p>
        </div>
      </div>

      {/* Kanan: Form Login */}
      <div className="flex-1 flex items-center justify-center p-8">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-6">
            <LogIn className="text-blue-600 w-6 h-6" />
            <h2 className="text-2xl font-bold text-black">Masuk ke Akun</h2>
          </div>

          {error && (
            <p className="bg-red-50 text-red-600 border border-red-200 p-2 rounded mb-4 text-sm text-center">
              {error}
            </p>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Email</label>
              <input
                type="email"
                placeholder="masukkan email kamu"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Password</label>
              <input
                type="password"
                placeholder="masukkan password"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? (
                <span className="animate-pulse">Memproses...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Masuk
                </>
              )}
            </button>
          </div>

          <p className="text-center text-sm text-black mt-6">
            Belum punya akun?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Daftar di sini
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}