'use client';

import { Home, Building2, Users, Star, LogOut } from 'lucide-react';
import Link from 'next/link';
import CommentBox from '@/components/CommentBox';
import { useRouter } from 'next/navigation';

type Props = {
  comment: string;
};

const dummyComment = {
  user_name: 'Budi',
  comment: 'Kosnya nyaman banget!',
  reply: 'Terima kasih ya, Budi!',
};

export default function OwnerSidebar({ comment }: Props) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  };

  return (
    <div className="w-64 bg-gradient-to-b from-white to-gray-50 shadow-md h-screen flex flex-col justify-between">
      {/* HEADER */}
      <div>
        <div className="p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">Owner Panel</h2>
          <p className="text-sm text-gray-500 mt-1">Kelola Kostmu dengan mudah</p>
        </div>

        {/* NAVIGATION */}
        <nav className="mt-4 space-y-2 px-4">
          <Link
            href="/owner/dashboard"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition"
          >
            <Home className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700 font-medium">Dashboard</span>
          </Link>

          <Link
            href="/owner/kos"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition"
          >
            <Building2 className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700 font-medium">Data Kost</span>
          </Link>

          <Link
            href="/owner/reviews"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition"
          >
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-700 font-medium">Review</span>
          </Link>

          <Link
            href="/owner/tenants"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition"
          >
            <Users className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 font-medium">Penyewa</span>
          </Link>
        </nav>
      </div>

      {/* FOOTER / COMMENT BOX */}
      <div className="p-4 shadow-inner">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Ulasan terbaru</h3>
        <CommentBox comment={dummyComment} />
        <p className="text-xs text-gray-400 mt-2">Prop dari layout: {comment}</p>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full mt-4 p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
