'use client';

import { useState } from 'react';
import axios from 'axios';

export default function BookingPage() {
  const [kosId, setKosId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'https://api-kamu.com/booking',
        {
          kos_id: kosId,
          start_date: startDate,
          end_date: endDate,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReceipt(res.data);
      setBookingSuccess(true);
    } catch (err) {
      console.error('Gagal booking kamar kos');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Form Pemesanan Kos</h1>
      <form onSubmit={handleBooking} className="bg-white p-4 rounded shadow-md max-w-md">
        <input
          type="text"
          placeholder="ID Kos"
          value={kosId}
          onChange={(e) => setKosId(e.target.value)}
          className="w-full p-2 border mb-3"
          required
        />
        <label className="block mb-1">Tanggal Mulai</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border mb-3"
          required
        />
        <label className="block mb-1">Tanggal Selesai</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border mb-3"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Booking
        </button>
      </form>

      {bookingSuccess && receipt && (
        <div className="mt-6 border p-4 rounded bg-green-50">
          <h2 className="text-xl font-bold mb-2">Bukti Pemesanan</h2>
          <p><strong>ID Pemesanan:</strong> {receipt.id}</p>
          <p><strong>ID Kos:</strong> {receipt.kos_id}</p>
          <p><strong>Tanggal:</strong> {receipt.start_date} s/d {receipt.end_date}</p>
          <p><strong>Status:</strong> {receipt.status}</p>
          <button
            onClick={() => window.print()}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Cetak Nota
          </button>
        </div>
      )}
    </div>
  );
}