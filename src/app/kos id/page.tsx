'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

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

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const resKos = await axios.get(`https://api-kamu.com/kos/${id}`);
        setKos(resKos.data);

        const resReviews = await axios.get(`https://api-kamu.com/kos/${id}/reviews`);
        setReviews(resReviews.data);
      } catch (err) {
        console.error('Gagal mengambil detail kos');
      }
    };
    fetchDetail();
  }, [id]);

  const handleComment = async () => {
    try {
      await axios.post(`https://api-kamu.com/kos/${id}/reviews`, {
        comment: newComment,
      });
      setNewComment('');
      // Refresh komentar
      const res = await axios.get(`https://api-kamu.com/kos/${id}/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error('Gagal menambahkan komentar');
    }
  };

  if (!kos) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{kos.name}</h1>
      <p>{kos.address}</p>
      <p>Rp {kos.price_per_month.toLocaleString()} / bulan</p>
      <p>Gender: {kos.gender}</p>
      <p className="mt-2 font-semibold">Fasilitas:</p>
      <ul className="list-disc ml-6">
        {kos.facilities.map((fasilitas, i) => (
          <li key={i}>{fasilitas}</li>
        ))}
      </ul>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Komentar</h2>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border mb-2"
          placeholder="Tulis komentar..."
        />
        <button onClick={handleComment} className="bg-green-500 text-white px-4 py-2 rounded">
          Kirim Komentar
        </button>

        <div className="mt-4">
          {reviews.map((review) => (
            <div key={review.id} className="border p-2 mb-2 rounded">
              <p className="font-semibold">{review.user_name}</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Booking Sekarang
        </button>
      </div>
    </div>
  );
}