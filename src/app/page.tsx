"use client";

import React from 'react';
import Navbar from './society/components/navbar';
import Typography from '../components/atom/typografi';
import SearchBar from '../components/molecules/SearchBar';
import Button from '../components/atom/button';
import Card from '../components/molecules/card';

export default function Home() {
  // Dummy data for kos
  const kosData = [
    {
      id: 1,
      name: 'Kos Mawar',
      address: 'Jl. Mawar No. 1',
      price_per_month: 500000,
      gender: 'female',
      imageSrc: './assets/images/kosimg.jpeg',
      imageAlt: 'Kos Mawar',
    },
    {
      id: 2,
      name: 'Kos Melati',
      address: 'Jl. Melati No. 2',
      price_per_month: 600000,
      gender: 'male',
      imageSrc: '/images/kos2.jpg',
      imageAlt: 'Kos Melati',
    },
    // Add more as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <Typography variant="h1" className="mb-4">
            Temukan Kos Impianmu
          </Typography>
          <Typography variant="p" className="mb-6 text-gray-600">
            Cari kos yang sesuai dengan kebutuhanmu dengan mudah dan cepat.
          </Typography>
          <div className="flex justify-center mb-6">
            <SearchBar
              placeholder="Cari nama kos atau lokasi..."
              value=""
              onChange={() => {}}
              className="w-full max-w-md"
            />
          </div>
          <Button variant="primary" size="lg">
            Cari Sekarang
          </Button>
        </section>

        {/* Kos Populer Section */}
        <section>
          <Typography variant="h2" className="mb-6 text-center">
            Kos Populer
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kosData.map((kos) => (
              <Card
                key={kos.id}
                imageSrc={kos.imageSrc}
                imageAlt={kos.imageAlt}
                title={kos.name}
                description={`${kos.address} - Rp ${kos.price_per_month.toLocaleString()}/bulan`}
                chipLabel={kos.gender === 'male' ? 'Pria' : kos.gender === 'female' ? 'Wanita' : 'Campur'}
                chipVariant={kos.gender === 'male' ? 'primary' : kos.gender === 'female' ? 'secondary' : 'success'}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}