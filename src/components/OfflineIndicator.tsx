'use client'

import { useEffect, useState } from 'react'
import { WifiOff } from 'lucide-react'

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed top-20 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50 animate-in slide-in-from-top-5">
      <div className="glass rounded-lg shadow-lg border border-yellow-500/50 bg-yellow-50/90 dark:bg-yellow-900/20 p-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <WifiOff className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              You're offline
            </p>
            <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-0.5">
              Some features may be limited
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
