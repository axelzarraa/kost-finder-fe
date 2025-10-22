import { Home, MapPin, DollarSign, Users } from 'lucide-react';

type Kos = {
  id: number;
  name: string;
  address: string;
  price_per_month: number;
  gender: 'male' | 'female' | 'all';
};

export default function KosCard({ kos }: { kos: Kos }) {
  const genderLabel =
    kos.gender === 'male'
      ? 'Laki-laki'
      : kos.gender === 'female'
      ? 'Perempuan'
      : 'Semua';

  const genderColor =
    kos.gender === 'male'
      ? 'bg-blue-100 text-blue-700'
      : kos.gender === 'female'
      ? 'bg-pink-100 text-pink-700'
      : 'bg-gray-100 text-gray-700';

  return (
    <div className="border border-gray-200 p-5 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Home className="text-blue-600 w-5 h-5" />
        <h2 className="text-lg font-semibold text-gray-800">{kos.name}</h2>
      </div>

      {/* Alamat */}
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <MapPin className="w-4 h-4" />
        <p>{kos.address}</p>
      </div>

      {/* Harga */}
      <div className="flex items-center gap-2 text-green-700 font-semibold mb-3">
        <DollarSign className="w-4 h-4" />
        <p>Rp {kos.price_per_month.toLocaleString('id-ID')} / bulan</p>
      </div>

      {/* Gender */}
      <div
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${genderColor}`}
      >
        <Users className="w-4 h-4" />
        <span>{genderLabel}</span>
      </div>
    </div>
  );
}
