import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Kos Hunter</h1>
      <nav className="space-x-4">
        <Link href="/kos" className="hover:underline">Kos</Link>
        <Link href="/booking" className="hover:underline">Booking</Link>
        <Link href="/owner/dashboard" className="hover:underline">Owner</Link>
        <Link href="/login" className="hover:underline">Login</Link>
      </nav>
    </header>
  );
}