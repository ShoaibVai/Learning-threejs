'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProgressStore } from '@/lib/progress'
import type { ProgressStats } from '@/types'

export default function ProgressPage() {
  const [stats, setStats] = useState<ProgressStats | null>(null)
  const [exportData, setExportData] = useState('')
  const [importData, setImportData] = useState('')

  useEffect(() => {
    const store = getProgressStore()
    // In a real app, we'd get totalLessons from the content
    setStats(store.getStats(24)) // 24 total lessons
  }, [])

  const handleExport = () => {
    const store = getProgressStore()
    setExportData(store.exportProgress())
  }

  const handleImport = () => {
    const store = getProgressStore()
    if (store.importProgress(importData)) {
      alert('Progress imported successfully!')
      window.location.reload()
    } else {
      alert('Invalid import data!')
    }
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      const store = getProgressStore()
      store.resetProgress()
      window.location.reload()
    }
  }

  if (!stats) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <p>Loading...</p>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Your Progress
        </h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {stats.completedLessons}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Lessons Completed</div>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {stats.completionPercentage}%
            </div>
            <div className="text-gray-600 dark:text-gray-400">Overall Progress</div>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {stats.averageQuizScore}%
            </div>
            <div className="text-gray-600 dark:text-gray-400">Avg Quiz Score</div>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              🔥 {stats.streak}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Day Streak</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-4">Course Completion</h2>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
            <div
              className="bg-primary-600 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold"
              style={{ width: `${stats.completionPercentage}%` }}
            >
              {stats.completionPercentage}%
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {stats.completedLessons} of {stats.totalLessons} lessons completed
          </p>
        </div>

        {/* Export/Import */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-4">Backup & Restore</h2>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Export Progress</h3>
            <button onClick={handleExport} className="btn-primary mb-2">
              Export Progress
            </button>
            {exportData && (
              <textarea
                value={exportData}
                readOnly
                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 font-mono text-sm"
                rows={6}
              />
            )}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Import Progress</h3>
            <textarea
              value={importData}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setImportData(e.target.value)}
              placeholder="Paste exported progress data here..."
              className="w-full p-3 border rounded-lg mb-2"
              rows={6}
            />
            <button onClick={handleImport} className="btn-primary">
              Import Progress
            </button>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-red-600">Danger Zone</h3>
            <button onClick={handleReset} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold">
              Reset All Progress
            </button>
          </div>
        </div>

        <Link href="/" className="text-primary-600 hover:text-primary-700">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
