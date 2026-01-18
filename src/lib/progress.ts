import type { UserProgress, QuizAttempt, ProgressStats } from '@/types'

const STORAGE_KEY = 'learning-platform-progress'

export class ProgressStore {
  private progress: UserProgress

  constructor() {
    this.progress = this.loadProgress()
  }

  private loadProgress(): UserProgress {
    if (typeof window === 'undefined') {
      return this.getDefaultProgress()
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return this.getDefaultProgress()

      const parsed = JSON.parse(stored)
      return {
        ...parsed,
        completedLessons: new Set(parsed.completedLessons || []),
        bookmarks: new Set(parsed.bookmarks || []),
      }
    } catch {
      return this.getDefaultProgress()
    }
  }

  private getDefaultProgress(): UserProgress {
    return {
      completedLessons: new Set(),
      quizAttempts: [],
      bookmarks: new Set(),
      lastAccessed: Date.now(),
      streak: 0,
      lastStreakDate: new Date().toISOString().split('T')[0],
    }
  }

  private saveProgress() {
    if (typeof window === 'undefined') return

    const toSave = {
      ...this.progress,
      completedLessons: Array.from(this.progress.completedLessons),
      bookmarks: Array.from(this.progress.bookmarks),
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  }

  markLessonComplete(lessonId: string) {
    this.progress.completedLessons.add(lessonId)
    this.updateStreak()
    this.saveProgress()
  }

  markLessonIncomplete(lessonId: string) {
    this.progress.completedLessons.delete(lessonId)
    this.saveProgress()
  }

  isLessonComplete(lessonId: string): boolean {
    return this.progress.completedLessons.has(lessonId)
  }

  addQuizAttempt(attempt: QuizAttempt) {
    this.progress.quizAttempts.push(attempt)
    this.saveProgress()
  }

  getQuizAttempts(lessonId: string): QuizAttempt[] {
    return this.progress.quizAttempts.filter((a) => a.lessonId === lessonId)
  }

  toggleBookmark(lessonId: string) {
    if (this.progress.bookmarks.has(lessonId)) {
      this.progress.bookmarks.delete(lessonId)
    } else {
      this.progress.bookmarks.add(lessonId)
    }
    this.saveProgress()
  }

  isBookmarked(lessonId: string): boolean {
    return this.progress.bookmarks.has(lessonId)
  }

  private updateStreak() {
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    if (this.progress.lastStreakDate === today) {
      // Already counted today
      return
    } else if (this.progress.lastStreakDate === yesterday) {
      // Continuing streak
      this.progress.streak++
    } else {
      // Streak broken, start new
      this.progress.streak = 1
    }

    this.progress.lastStreakDate = today
  }

  getStats(totalLessons: number): ProgressStats {
    const completed = this.progress.completedLessons.size
    const percentage = totalLessons > 0 ? (completed / totalLessons) * 100 : 0

    const totalScore = this.progress.quizAttempts.reduce(
      (sum, a) => sum + a.score,
      0
    )
    const totalPoints = this.progress.quizAttempts.reduce(
      (sum, a) => sum + a.totalPoints,
      0
    )
    const averageScore =
      totalPoints > 0 ? (totalScore / totalPoints) * 100 : 0

    return {
      totalLessons,
      completedLessons: completed,
      completionPercentage: Math.round(percentage),
      averageQuizScore: Math.round(averageScore),
      streak: this.progress.streak,
    }
  }

  exportProgress(): string {
    const data = {
      ...this.progress,
      completedLessons: Array.from(this.progress.completedLessons),
      bookmarks: Array.from(this.progress.bookmarks),
    }
    return JSON.stringify(data, null, 2)
  }

  importProgress(jsonString: string) {
    try {
      const parsed = JSON.parse(jsonString)
      this.progress = {
        ...parsed,
        completedLessons: new Set(parsed.completedLessons || []),
        bookmarks: new Set(parsed.bookmarks || []),
      }
      this.saveProgress()
      return true
    } catch {
      return false
    }
  }

  resetProgress() {
    this.progress = this.getDefaultProgress()
    this.saveProgress()
  }
}

// Singleton instance
let progressStore: ProgressStore | null = null

export function getProgressStore(): ProgressStore {
  if (!progressStore) {
    progressStore = new ProgressStore()
  }
  return progressStore
}
