import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTrack } from '@/lib/content'

export default async function TrackPage({
  params,
}: {
  params: { trackId: string }
}) {
  const track = await getTrack(params.trackId)

  if (!track) {
    notFound()
  }

  const totalLessons = track.modules.reduce((sum, m) => sum + m.lessons.length, 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="flex items-start gap-4">
            <div className="text-6xl">{track.icon}</div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {track.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {track.description}
              </p>
              <div className="mt-4 flex gap-4 text-sm text-gray-500">
                <span>{track.modules.length} modules</span>
                <span>•</span>
                <span>{totalLessons} lessons</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-6">
          {track.modules.map((module, index) => (
            <div key={module.id} className="card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {module.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {module.summary}
                  </p>
                  <div className="space-y-2">
                    {module.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/tracks/${track.id}/modules/${module.id}/lessons/${lesson.id}`}
                        className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {lesson.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {lesson.durationMinutes} min • {lesson.objectives.length} objectives
                            </p>
                          </div>
                          <span className="text-primary-600">→</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
