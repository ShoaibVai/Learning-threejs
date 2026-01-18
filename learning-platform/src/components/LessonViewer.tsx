'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import type { Lesson, Track, Module } from '@/types'
import { getProgressStore } from '@/lib/progress'
import QuizComponent from './QuizComponent'

interface LessonViewerProps {
  lesson: Lesson
  track: Track
  module: Module
  trackId: string
  moduleId: string
  nextLesson: { lesson: Lesson; moduleId: string } | null
  previousLesson: { lesson: Lesson; moduleId: string } | null
}

export default function LessonViewer({
  lesson,
  track,
  module,
  trackId,
  moduleId,
  nextLesson,
  previousLesson,
}: LessonViewerProps) {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'test' | 'resources'>('learn')
  const [isComplete, setIsComplete] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const store = getProgressStore()
    setIsComplete(store.isLessonComplete(lesson.id))
    setIsBookmarked(store.isBookmarked(lesson.id))
  }, [lesson.id])

  const toggleComplete = () => {
    const store = getProgressStore()
    if (isComplete) {
      store.markLessonIncomplete(lesson.id)
    } else {
      store.markLessonComplete(lesson.id)
    }
    setIsComplete(!isComplete)
  }

  const toggleBookmark = () => {
    const store = getProgressStore()
    store.toggleBookmark(lesson.id)
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/tracks/${trackId}`} className="hover:text-primary-600">{track.title}</Link>
          <span className="mx-2">/</span>
          <span>{module.title}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{lesson.title}</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {lesson.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {lesson.overview}
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
              {lesson.durationMinutes} min
            </span>
            <button
              onClick={toggleComplete}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isComplete
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {isComplete ? '✓ Completed' : 'Mark Complete'}
            </button>
            <button
              onClick={toggleBookmark}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
            >
              {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="flex gap-4">
            {(['learn', 'practice', 'test', 'resources'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="card mb-6">
          {activeTab === 'learn' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Learning Objectives</h2>
              <ul className="list-disc list-inside space-y-2 mb-6">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">{obj}</li>
                ))}
              </ul>

              {lesson.prerequisites.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                  <ul className="list-disc list-inside space-y-2 mb-6">
                    {lesson.prerequisites.map((pre, i) => (
                      <li key={i} className="text-gray-700 dark:text-gray-300">{pre}</li>
                    ))}
                  </ul>
                </>
              )}

              {lesson.sections.map((section, i) => (
                <div key={i} className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                  <div className="markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                      {section.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'practice' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Mini Project</h2>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{lesson.miniProject.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {lesson.miniProject.description}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Estimated time: {lesson.miniProject.estimatedTime} minutes
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-3">Steps</h3>
              <ol className="list-decimal list-inside space-y-2 mb-6">
                {lesson.miniProject.steps.map((step, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">{step}</li>
                ))}
              </ol>

              <h3 className="text-xl font-semibold mb-3">Deliverables</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                {lesson.miniProject.deliverables.map((del, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">{del}</li>
                ))}
              </ul>

              {lesson.miniProject.starterPath && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Starter Template</p>
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {lesson.miniProject.starterPath}
                  </code>
                  <Link
                    href="/practice"
                    className="block mt-2 text-primary-600 hover:text-primary-700"
                  >
                    View in Practice Section →
                  </Link>
                </div>
              )}

              <h3 className="text-xl font-semibold mb-3 mt-6">Environment Setup</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Setup Steps</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    {lesson.environment.setupSteps.map((step, i) => (
                      <li key={i} className="text-gray-700 dark:text-gray-300 text-sm">{step}</li>
                    ))}
                  </ol>
                </div>

                {lesson.environment.commands.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Commands</h4>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg space-y-2 overflow-x-auto">
                      {lesson.environment.commands.map((cmd, i) => (
                        <code key={i} className="block">{cmd}</code>
                      ))}
                    </div>
                  </div>
                )}

                {lesson.environment.troubleshooting.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Troubleshooting</h4>
                    <div className="space-y-3">
                      {lesson.environment.troubleshooting.map((item, i) => (
                        <div key={i} className="border-l-4 border-yellow-500 pl-4">
                          <p className="font-semibold text-sm">{item.issue}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.solution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'test' && <QuizComponent lesson={lesson} />}

          {activeTab === 'resources' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Resources</h2>
              <div className="grid gap-4">
                {lesson.resources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
                        {resource.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {resource.description}
                          </p>
                        )}
                        <span className="text-xs text-gray-500 uppercase">{resource.type}</span>
                      </div>
                      <span className="text-primary-600">↗</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          {previousLesson ? (
            <Link
              href={`/tracks/${trackId}/modules/${previousLesson.moduleId}/lessons/${previousLesson.lesson.id}`}
              className="btn-secondary"
            >
              ← Previous: {previousLesson.lesson.title}
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/tracks/${trackId}/modules/${nextLesson.moduleId}/lessons/${nextLesson.lesson.id}`}
              className="btn-primary"
            >
              Next: {nextLesson.lesson.title} →
            </Link>
          ) : (
            <Link href={`/tracks/${trackId}`} className="btn-primary">
              Back to Track →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
