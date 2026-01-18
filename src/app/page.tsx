import Link from 'next/link'
import { getAllTracks } from '@/lib/content'

export default async function HomePage() {
  const tracks = await getAllTracks()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Master Your Skills
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive learning paths for Server & Networking and Web Game Development.
            Learn → Practice → Test → Build.
          </p>
        </div>

        {/* Tracks */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {tracks.map((track) => (
            <Link
              key={track.id}
              href={`/tracks/${track.id}`}
              className="group"
            >
              <div className="card hover:shadow-xl transition-shadow h-full">
                <div className="text-6xl mb-4">{track.icon}</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  {track.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {track.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {track.modules.length} modules
                  </span>
                  <span className="text-primary-600 group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link href="/practice" className="card hover:shadow-lg transition-shadow text-center">
            <div className="text-4xl mb-2">🛠️</div>
            <h3 className="font-semibold text-lg mb-2">Practice</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Starter templates and labs
            </p>
          </Link>
          <Link href="/progress" className="card hover:shadow-lg transition-shadow text-center">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="font-semibold text-lg mb-2">Progress</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track your learning journey
            </p>
          </Link>
          <Link href="/search" className="card hover:shadow-lg transition-shadow text-center">
            <div className="text-4xl mb-2">🔍</div>
            <h3 className="font-semibold text-lg mb-2">Search</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Find lessons and resources
            </p>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600 dark:text-gray-400 text-sm">
          <p>Built for developers who want to learn by doing</p>
        </div>
      </div>
    </div>
  )
}
