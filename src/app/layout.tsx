import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { Providers } from './providers'
import { Search, PenTool, LayoutDashboard } from 'lucide-react'
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'
import { OfflineIndicator } from '@/components/OfflineIndicator'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learning Platform - Server & Networking | Web Game Dev',
  description: 'Master server infrastructure and web game development with hands-on lessons',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Learning Platform',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Learning Platform" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background antialiased selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden`}>
        <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px] animate-pulse"></div>
        </div>
        
        <nav className="sticky top-0 z-50 w-full glass shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg group-hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20 overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full"></div>
                  L
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground group-hover:to-primary transition-all">
                  Learning Platform
                </span>
              </Link>
              <div className="flex items-center gap-1 sm:gap-2">
                <Link href="/search" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all">
                  <Search className="w-4 h-4" />
                  Search
                </Link>
                <Link href="/practice" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all">
                  <PenTool className="w-4 h-4" />
                  Practice
                </Link>
                <Link href="/progress" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all">
                  <LayoutDashboard className="w-4 h-4" />
                  Progress
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <Providers>
          <OfflineIndicator />
          <main className="relative z-0 min-h-[calc(100vh-64px)]">
            {children}
          </main>
          <PWAInstallPrompt />
        </Providers>
      </body>
    </html>
  )
}
