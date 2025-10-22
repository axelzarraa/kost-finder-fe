'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  room: string;
}

export default function OwnerTenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://api-kamu.com/owner/tenants', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTenants(res.data);
      } catch (err) {
        console.error('Gagal mengambil data penyewa');
      } finally {
        setLoading(false);
      }
    };
    fetchTenants();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-poppins">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          Daftar Penyewa Kos 🧍‍♂️🧍‍♀️
        </h1>

        {loading ? (
          <p className="text-center text-black animate-pulse">Memuat data penyewa...</p>
        ) : tenants.length === 0 ? (
          <p className="text-center text-black italic">Belum ada penyewa terdaftar.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {tenants.map((tenant) => (
              <div
                key={tenant.id}
                className="bg-white/80 backdrop-blur-lg p-5 rounded-xl shadow hover:shadow-md transition"
              >
                <h2 className="text-lg font-bold text-black">{tenant.name}</h2>
                <p className="text-black text-sm">Email: {tenant.email}</p>
                <p className="text-black text-sm">Telepon: {tenant.phone}</p>
                <p className="text-black text-sm">Kamar: {tenant.room}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}