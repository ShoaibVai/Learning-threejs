import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learning Platform - Server & Networking | Web Game Dev',
  description: 'Master server infrastructure and web game development with hands-on lessons',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                Learning Platform
              </Link>
              <div className="flex gap-6">
                <Link href="/search" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                  Search
                </Link>
                <Link href="/practice" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                  Practice
                </Link>
                <Link href="/progress" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                  Progress
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
