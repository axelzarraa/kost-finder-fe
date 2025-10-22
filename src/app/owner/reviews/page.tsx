'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { MessageSquare, Send, User } from 'lucide-react'; // pastikan sudah install lucide-react

interface Review {
  id: number;
  kos_id: number;
  user_name: string;
  comment: string;
  reply?: string;
}

export default function OwnerReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [replyMap, setReplyMap] = useState<{ [key: number]: string }>({});

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchReviews = async () => {
    try {
      const res = await axios.get('https://api-kamu.com/owner/reviews', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(res.data);
    } catch (err) {
      console.error('Gagal mengambil data review');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReply = async (id: number) => {
    try {
      await axios.post(
        `https://api-kamu.com/owner/reviews/${id}/reply`,
        { reply: replyMap[id] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReviews();
      setReplyMap((prev) => ({ ...prev, [id]: '' }));
    } catch (err) {
      console.error('Gagal membalas komentar');
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
        <MessageSquare className="text-blue-600" size={28} />
        Balas Komentar Society
      </h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center mt-20 text-lg">
          Belum ada komentar dari penyewa 😌
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="text-blue-600" size={22} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {review.user_name}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    “{review.comment}”
                  </p>
                </div>
              </div>

              {review.reply ? (
                <div className="mt-3 bg-green-50 border-l-4 border-green-500 p-3 rounded">
                  <p className="text-sm text-green-700">
                    <span className="font-semibold">Balasan Owner:</span>{' '}
                    {review.reply}
                  </p>
                </div>
              ) : (
                <div className="mt-4">
                  <textarea
                    placeholder="Tulis balasan untuk penyewa ini..."
                    value={replyMap[review.id] || ''}
                    onChange={(e) =>
                      setReplyMap({ ...replyMap, [review.id]: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    rows={3}
                  />
                  <button
                    onClick={() => handleReply(review.id)}
                    className="mt-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    <Send size={16} />
                    Kirim Balasan
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
