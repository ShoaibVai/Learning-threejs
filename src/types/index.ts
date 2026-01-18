// Core data types for the learning platform

export interface Resource {
  title: string
  url: string
  type: 'article' | 'video' | 'documentation' | 'tool' | 'internal'
  description?: string
}

export interface QuizQuestion {
  id: string
  type: 'single' | 'multiple' | 'short-answer'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  points: number
}

export interface Quiz {
  questions: QuizQuestion[]
  passingScore: number
}

export interface MiniProject {
  title: string
  description: string
  steps: string[]
  deliverables: string[]
  rubric: string[]
  starterPath?: string
  estimatedTime: number
}

export interface EnvironmentSetup {
  setupSteps: string[]
  commands: string[]
  troubleshooting: { issue: string; solution: string }[]
}

export interface LessonSection {
  type: 'reading' | 'guide' | 'practice' | 'quiz'
  title: string
  content: string
  links?: Resource[]
}

export interface Lesson {
  id: string
  title: string
  slug: string
  overview: string
  objectives: string[]
  prerequisites: string[]
  durationMinutes: number
  sections: LessonSection[]
  resources: Resource[]
  miniProject: MiniProject
  quiz: Quiz
  environment: EnvironmentSetup
  order: number
}

export interface Module {
  id: string
  title: string
  slug: string
  summary: string
  lessons: Lesson[]
  order: number
}

export interface Track {
  id: string
  title: string
  slug: string
  description: string
  icon: string
  modules: Module[]
}

// Progress tracking types
export interface QuizAttempt {
  lessonId: string
  score: number
  totalPoints: number
  timestamp: number
  answers: Record<string, string | string[]>
}

export interface UserProgress {
  completedLessons: Set<string>
  quizAttempts: QuizAttempt[]
  bookmarks: Set<string>
  lastAccessed: number
  streak: number
  lastStreakDate: string
}

export interface ProgressStats {
  totalLessons: number
  completedLessons: number
  completionPercentage: number
  averageQuizScore: number
  streak: number
}
