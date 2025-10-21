import Link from 'next/link';

interface Kos {
  id: number;
  name: string;
  address: string;
  price_per_month: number;
  gender: 'male' | 'female' | 'all';
}

export default function KosCard({ kos }: { kos: Kos }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-lg font-bold">{kos.name}</h2>
      <p className="text-sm text-gray-600">{kos.address}</p>
      <p className="mt-1 font-semibold">
        Rp {kos.price_per_month.toLocaleString()} / bulan
      </p>
      <p className="text-sm text-gray-500">Gender: {kos.gender}</p>
      <Link href={`/kos/${kos.id}`}>
        <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Lihat Detail
        </button>
      </Link>
    </div>
  );
}