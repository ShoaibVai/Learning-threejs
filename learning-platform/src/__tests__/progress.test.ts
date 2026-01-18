import { describe, it, expect, beforeEach } from 'vitest'
import { ProgressStore } from '../lib/progress'

describe('ProgressStore', () => {
  let store: ProgressStore

  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof window !== 'undefined') {
      localStorage.clear()
    }
    store = new ProgressStore()
  })

  describe('markComplete', () => {
    it('should mark a lesson as complete', () => {
      store.markComplete('lesson-1')
      const progress = store.getProgress('lesson-1')
      
      expect(progress?.completed).toBe(true)
      expect(progress?.completedAt).toBeGreaterThan(0)
    })

    it('should update streak when completing lessons', () => {
      store.markComplete('lesson-1')
      const stats = store.getStats(10)
      
      expect(stats.streak).toBeGreaterThan(0)
    })
  })

  describe('addQuizAttempt', () => {
    it('should store quiz attempt', () => {
      const attempt = {
        lessonId: 'lesson-1',
        score: 80,
        totalPoints: 100,
        timestamp: Date.now(),
        answers: { q1: 'A', q2: 'B' },
      }

      store.addQuizAttempt(attempt)
      const progress = store.getProgress('lesson-1')

      expect(progress?.quizAttempts).toHaveLength(1)
      expect(progress?.quizAttempts[0].score).toBe(80)
    })

    it('should track best quiz score', () => {
      store.addQuizAttempt({
        lessonId: 'lesson-1',
        score: 60,
        totalPoints: 100,
        timestamp: Date.now(),
        answers: {},
      })

      store.addQuizAttempt({
        lessonId: 'lesson-1',
        score: 90,
        totalPoints: 100,
        timestamp: Date.now() + 1000,
        answers: {},
      })

      const progress = store.getProgress('lesson-1')
      const bestScore = Math.max(...progress!.quizAttempts.map((a) => a.score))

      expect(bestScore).toBe(90)
    })
  })

  describe('getStats', () => {
    it('should calculate completion percentage', () => {
      store.markComplete('lesson-1')
      store.markComplete('lesson-2')
      
      const stats = store.getStats(10) // 10 total lessons
      
      expect(stats.completedLessons).toBe(2)
      expect(stats.completionPercentage).toBe(20)
    })

    it('should calculate average quiz score', () => {
      store.addQuizAttempt({
        lessonId: 'lesson-1',
        score: 80,
        totalPoints: 100,
        timestamp: Date.now(),
        answers: {},
      })

      store.addQuizAttempt({
        lessonId: 'lesson-2',
        score: 90,
        totalPoints: 100,
        timestamp: Date.now(),
        answers: {},
      })

      const stats = store.getStats(10)
      
      expect(stats.averageQuizScore).toBe(85)
    })
  })

  describe('export and import', () => {
    it('should export progress as JSON string', () => {
      store.markComplete('lesson-1')
      store.toggleBookmark('lesson-2')

      const exported = store.exportProgress()
      
      expect(exported).toContain('lesson-1')
      expect(exported).toContain('lesson-2')
    })

    it('should import valid progress data', () => {
      const mockData = {
        progress: {
          'lesson-1': {
            completed: true,
            completedAt: Date.now(),
            quizAttempts: [],
          },
        },
        bookmarks: ['lesson-2'],
        streak: 5,
        lastActivityDate: Date.now(),
      }

      const imported = store.importProgress(JSON.stringify(mockData))
      
      expect(imported).toBe(true)
      expect(store.getProgress('lesson-1')?.completed).toBe(true)
      expect(store.isBookmarked('lesson-2')).toBe(true)
    })

    it('should reject invalid import data', () => {
      const imported = store.importProgress('invalid json')
      
      expect(imported).toBe(false)
    })
  })

  describe('resetProgress', () => {
    it('should clear all progress data', () => {
      store.markComplete('lesson-1')
      store.toggleBookmark('lesson-2')
      store.addQuizAttempt({
        lessonId: 'lesson-1',
        score: 80,
        totalPoints: 100,
        timestamp: Date.now(),
        answers: {},
      })

      store.resetProgress()

      const stats = store.getStats(10)
      expect(stats.completedLessons).toBe(0)
      expect(store.isBookmarked('lesson-2')).toBe(false)
    })
  })
})
