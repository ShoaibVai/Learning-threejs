'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'

interface SearchResult {
  lessonId: string
  lessonTitle: string
  trackId: string
  trackTitle: string
  moduleId: string
  moduleTitle: string
  snippet: string
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)
    
    // In a production app, this would fetch from an API or use a pre-built search index
    // For now, we'll simulate search results
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          lessonId: 'local-server-basics',
          lessonTitle: 'Local Server Fundamentals',
          trackId: 'server-networking',
          trackTitle: 'Server & Networking',
          moduleId: '01-hosting-basics',
          moduleTitle: 'Hosting Your Local Machine Publicly',
          snippet: 'Understanding how servers work on your local machine, the localhost concept...',
        },
      ].filter((r) => r.lessonTitle.toLowerCase().includes(query.toLowerCase()))

      setResults(mockResults)
      setIsSearching(false)
    }, 300)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Search Lessons
        </h1>

        <div className="mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for lessons, topics, or concepts..."
            className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:border-primary-500 focus:outline-none"
          />
        </div>

        {isSearching && (
          <p className="text-gray-600 dark:text-gray-400">Searching...</p>
        )}

        {!isSearching && results.length > 0 && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Found {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
            {results.map((result) => (
              <Link
                key={result.lessonId}
                href={`/tracks/${result.trackId}/modules/${result.moduleId}/lessons/${result.lessonId}`}
                className="block card hover:shadow-lg transition-shadow"
              >
                <div className="text-sm text-gray-500 mb-1">
                  {result.trackTitle} → {result.moduleTitle}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {result.lessonTitle}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{result.snippet}</p>
              </Link>
            ))}
          </div>
        )}

        {!isSearching && query && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No results found for "{query}"
            </p>
            <p className="text-sm text-gray-500">
              Try different keywords or browse the tracks
            </p>
          </div>
        )}

        {!query && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Start typing to search across all lessons and resources
            </p>
          </div>
        )}

        <div className="mt-8">
          <Link href="/" className="text-primary-600 hover:text-primary-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
