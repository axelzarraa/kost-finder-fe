'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Booking {
  id: number;
  kos_id: number;
  user_name: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'accept' | 'reject';
}

export default function TransaksiPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchBookings = async () => {
    try {
      const res = await axios.get('https://api-kamu.com/owner/bookings', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          month: filterMonth,
          year: filterYear,
        },
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Gagal mengambil histori transaksi');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filterMonth, filterYear]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Histori Transaksi Pemesanan Kos</h1>

      <div className="flex gap-4 mb-6">
        <select
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Semua Bulan</option>
          <option value="01">Januari</option>
          <option value="02">Februari</option>
          <option value="03">Maret</option>
          <option value="04">April</option>
          <option value="05">Mei</option>
          <option value="06">Juni</option>
          <option value="07">Juli</option>
          <option value="08">Agustus</option>
          <option value="09">September</option>
          <option value="10">Oktober</option>
          <option value="11">November</option>
          <option value="12">Desember</option>
        </select>

        <input
          type="number"
          placeholder="Tahun"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="p-2 border rounded w-32"
        />
      </div>

      <div className="bg-white p-4 rounded shadow-md">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nama Penyewa</th>
              <th className="p-2 border">Kos ID</th>
              <th className="p-2 border">Tanggal</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="p-2 border">{booking.id}</td>
                <td className="p-2 border">{booking.user_name}</td>
                <td className="p-2 border">{booking.kos_id}</td>
                <td className="p-2 border">
                  {booking.start_date} s/d {booking.end_date}
                </td>
                <td className="p-2 border capitalize">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}