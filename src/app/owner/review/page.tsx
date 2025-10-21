'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

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

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

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
    } catch (err) {
      console.error('Gagal membalas komentar');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Balas Komentar Society</h1>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">{review.user_name}</p>
            <p className="mb-2">{review.comment}</p>
            {review.reply ? (
              <p className="text-green-600">Balasan: {review.reply}</p>
            ) : (
              <div>
                <textarea
                  placeholder="Tulis balasan..."
                  value={replyMap[review.id] || ''}
                  onChange={(e) =>
                    setReplyMap({ ...replyMap, [review.id]: e.target.value })
                  }
                  className="w-full p-2 border mb-2"
                />
                <button
                  onClick={() => handleReply(review.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Kirim Balasan
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}