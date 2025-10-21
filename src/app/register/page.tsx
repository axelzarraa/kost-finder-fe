'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'society' | 'owner'>('society');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://api-kamu.com/register', {
        name,
        email,
        password,
        phone,
        role,
      });

      router.push('/login');
    } catch (err) {
      setError('Registrasi gagal. Coba lagi.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Register Kos Hunter</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'society' | 'owner')}
          className="w-full p-2 border mb-3"
        >
          <option value="society">Society</option>
          <option value="owner">Owner</option>
        </select>
        <input
          type="text"
          placeholder="Nama"
          className="w-full p-2 border mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="No. HP"
          className="w-full p-2 border mb-3"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}