import type { Metadata } from 'next'
import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Providers from './provider'
import { Suspense } from 'react'

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kost Finder',
  description: 'The best kost finder application in Indonesia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${plusJakartaSans.className} h-full`}>
        <Suspense>
          <Providers>
            <div className="min-h-screen">
              {children}
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}