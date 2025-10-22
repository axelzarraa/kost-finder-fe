'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Star, Send, Home } from 'lucide-react';

interface Kos {
  id: number;
  name: string;
  address: string;
  price_per_month: number;
  gender: 'male' | 'female' | 'all';
  facilities: string[];
}

interface Review {
  id: number;
  comment: string;
  user_name: string;
}

export default function KosDetailPage() {
  const { id } = useParams();
  const [kos, setKos] = useState<Kos | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const resKos = await axios.get(`https://api-kamu.com/kos/${id}`);
        setKos(resKos.data);

        const resReviews = await axios.get(`https://api-kamu.com/kos/${id}/reviews`);
        setReviews(resReviews.data);
      } catch (err) {
        console.error('Gagal mengambil detail kos');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleComment = async () => {
    if (!newComment.trim()) return;
    setSending(true);
    try {
      await axios.post(`https://api-kamu.com/kos/${id}/reviews`, {
        comment: newComment,
      });
      setNewComment('');
      const res = await axios.get(`https://api-kamu.com/kos/${id}/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error('Gagal menambahkan komentar');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 animate-pulse">
        Memuat detail kos...
      </div>
    );
  }

  if (!kos) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Kos tidak ditemukan 🥺
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
              <Home className="w-7 h-7" />
              {kos.name}
            </h1>
            <p className="text-gray-600 mt-1">{kos.address}</p>
          </div>
          <div className="text-right mt-3 sm:mt-0">
            <p className="text-green-600 font-semibold text-xl">
              Rp {kos.price_per_month.toLocaleString()} / bulan
            </p>
            <p className="text-sm text-gray-500">
              Untuk:{' '}
              {kos.gender === 'male'
                ? 'Laki-laki'
                : kos.gender === 'female'
                ? 'Perempuan'
                : 'Semua'}
            </p>
          </div>
        </div>

        {/* Fasilitas */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Fasilitas</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {kos.facilities.map((fasilitas, i) => (
              <li
                key={i}
                className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium"
              >
                {fasilitas}
              </li>
            ))}
          </ul>
        </div>

        {/* Komentar */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Komentar</h2>
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
              placeholder="Tulis pengalaman atau pertanyaanmu..."
              rows={3}
            />
            <button
              onClick={handleComment}
              disabled={sending}
              className="mt-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {sending ? 'Mengirim...' : 'Kirim Komentar'}
            </button>
          </div>

          <div className="space-y-3">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-sm italic">
                Belum ada komentar. Jadilah yang pertama!
              </p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-200 rounded-lg p-3 bg-gray-50 hover:shadow-sm transition"
                >
                  <p className="font-semibold text-blue-700">
                    {review.user_name}
                  </p>
                  <p className="text-gray-800 mt-1">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tombol Booking */}
        <div className="text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition">
            Booking Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
