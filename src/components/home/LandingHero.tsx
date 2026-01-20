'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function LandingHero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 backdrop-blur-sm shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Version 2.0 Now Available
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl"
          >
            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Infrastructure</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Game Dev</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl leading-relaxed"
          >
            Comprehensive learning paths designed for developers. From setting up secure servers to building multiplayer web games. Learn by doing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Link
              href="#tracks"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 px-8 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            >
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/practice"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background px-8 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Practice Labs
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Abstract Background Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
      </div>
      <div className="absolute top-0 right-0 -z-10 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="w-[400px] h-[400px] bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>
      </div>
    </section>
  )
}
