'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Track } from '@/types'
import { ArrowRight, BookOpen, BarChart } from 'lucide-react'

export function TrackList({ tracks }: { tracks: Track[] }) {
  return (
    <section id="tracks" className="py-20 relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-foreground">Learning Tracks</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Select a path to begin your journey. Each track is designed to take you from basics to advanced concepts with practical exercises.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <Link href={`/tracks/${track.id}`} className="block h-full">
                <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                    <div className="text-9xl grayscale">{track.icon}</div>
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-4xl group-hover:scale-110 transition-transform duration-300 shadow-sm text-primary">
                      {track.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                      {track.title}
                    </h3>

                    <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
                      {track.description}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />
                          {track.modules.length} modules
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BarChart className="w-4 h-4" />
                          Structured
                        </span>
                      </div>

                      <span className="flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                        Start Track <ArrowRight className="ml-1 w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
