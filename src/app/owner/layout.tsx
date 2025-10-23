'use client';

import OwnerSidebar from '@/components/OwnerSidebar';
import Header from '@/components/Header';

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 font-poppins text-black">
      {/* Sidebar */}
      <OwnerSidebar comment="Ini prop dummy" />

      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="bg-white rounded shadow-md p-6 min-h-[80vh]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}