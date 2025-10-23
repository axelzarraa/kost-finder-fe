'use client';

import { useState } from 'react';
import axios from 'axios';
import { Calendar, Home, Printer, CheckCircle2 } from 'lucide-react';

export default function BookingPage() {
  const [kosId, setKosId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
      alert('Booking gagal. Coba lagi ya!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <Home className="text-blue-600 w-6 h-6" />
          <h1 className="text-2xl font-bold text-black">Form Pemesanan Kos</h1>
        </div>

        <form onSubmit={handleBooking} className="space-y-4 text-black">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">ID Kos</label>
            <input
              type="text"
              placeholder="Masukkan ID Kos"
              value={kosId}
              onChange={(e) => setKosId(e.target.value)}
              className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-black/70"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-1 text-black">
              <Calendar className="w-4 h-4 text-blue-500" /> Tanggal Mulai
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-1 text-black">
              <Calendar className="w-4 h-4 text-blue-500" /> Tanggal Selesai
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-all ${
              loading && 'opacity-70 cursor-not-allowed'
            }`}
          >
            {loading ? 'Memproses...' : 'Pesan Sekarang'}
          </button>
        </form>
      </div>

      {/* Bukti Pemesanan */}
      {bookingSuccess && receipt && (
        <div className="w-full max-w-lg mt-8 bg-green-50 border border-green-200 rounded-2xl p-6 shadow-md text-black">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-green-800">Bukti Pemesanan</h2>
          </div>
          <div className="space-y-2 text-black">
            <p><strong>ID Pemesanan:</strong> {receipt.id}</p>
            <p><strong>ID Kos:</strong> {receipt.kos_id}</p>
            <p>
              <strong>Tanggal:</strong> {receipt.start_date} s/d {receipt.end_date}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              <span
                className={`px-2 py-1 rounded-md text-white text-sm ${
                  receipt.status === 'pending'
                    ? 'bg-yellow-500'
                    : receipt.status === 'approved'
                    ? 'bg-green-600'
                    : 'bg-red-600'
                }`}
              >
                {receipt.status}
              </span>
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="mt-5 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all"
          >
            <Printer className="w-4 h-4" />
            Cetak Nota
          </button>
        </div>
      )}
    </div>
  );
}
