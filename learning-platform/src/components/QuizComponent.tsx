'use client'

import React, { useState } from 'react'
import type { Lesson, QuizQuestion } from '@/types'
import { getProgressStore } from '@/lib/progress'

export default function QuizComponent({ lesson }: { lesson: Lesson }) {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev: Record<string, string | string[]>) => ({ ...prev, [questionId]: answer }))
  }

  const handleSubmit = () => {
    let totalScore = 0
    let totalPoints = 0

    lesson.quiz.questions.forEach((q) => {
      totalPoints += q.points
      const userAnswer = answers[q.id]

      if (q.type === 'single') {
        if (userAnswer === q.correctAnswer) {
          totalScore += q.points
        }
      } else if (q.type === 'multiple') {
        const correct = Array.isArray(q.correctAnswer) ? q.correctAnswer.sort() : []
        const user = Array.isArray(userAnswer) ? userAnswer.sort() : []
        if (JSON.stringify(correct) === JSON.stringify(user)) {
          totalScore += q.points
        }
      } else if (q.type === 'short-answer') {
        // For short answer, give full points (would need manual grading in real app)
        if (userAnswer && String(userAnswer).trim().length > 20) {
          totalScore += q.points
        }
      }
    })

    setScore(totalScore)
    setSubmitted(true)

    // Save quiz attempt
    const store = getProgressStore()
    store.addQuizAttempt({
      lessonId: lesson.id,
      score: totalScore,
      totalPoints,
      timestamp: Date.now(),
      answers,
    })
  }

  const percentage = submitted ? Math.round((score / lesson.quiz.questions.reduce((sum, q) => sum + q.points, 0)) * 100) : 0
  const passed = percentage >= lesson.quiz.passingScore

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quiz</h2>
      
      {!submitted ? (
        <>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Passing score: {lesson.quiz.passingScore}%
          </p>

          <div className="space-y-6">
            {lesson.quiz.questions.map((question, index) => (
              <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between mb-3">
                  <h3 className="font-semibold">
                    Question {index + 1}: {question.question}
                  </h3>
                  <span className="text-sm text-gray-500">{question.points} pts</span>
                </div>

                {question.type === 'single' && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={question.id}
                          value={option}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAnswer(question.id, e.target.value)}
                          className="w-4 h-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'multiple' && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          value={option}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const current = (answers[question.id] as string[]) || []
                            if (e.target.checked) {
                              handleAnswer(question.id, [...current, option])
                            } else {
                              handleAnswer(question.id, current.filter((a) => a !== option))
                            }
                          }}
                          className="w-4 h-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'short-answer' && (
                  <textarea
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleAnswer(question.id, e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    rows={4}
                    placeholder="Type your answer here..."
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== lesson.quiz.questions.length}
            className="btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Quiz
          </button>
        </>
      ) : (
        <>
          <div className={`p-6 rounded-lg mb-6 ${passed ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
            <h3 className="text-2xl font-bold mb-2">
              {passed ? '✓ Passed!' : '✗ Not Passed'}
            </h3>
            <p className="text-lg">
              Your score: {score} / {lesson.quiz.questions.reduce((sum, q) => sum + q.points, 0)} ({percentage}%)
            </p>
            {!passed && (
              <p className="text-sm mt-2">
                You need {lesson.quiz.passingScore}% to pass. Review the material and try again!
              </p>
            )}
          </div>

          <div className="space-y-6">
            {lesson.quiz.questions.map((question, index) => {
              const userAnswer = answers[question.id]
              const isCorrect = question.type === 'single'
                ? userAnswer === question.correctAnswer
                : question.type === 'multiple'
                ? JSON.stringify((userAnswer as string[])?.sort()) === JSON.stringify((question.correctAnswer as string[]).sort())
                : String(userAnswer).trim().length > 20

              return (
                <div
                  key={question.id}
                  className={`border-2 rounded-lg p-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}
                >
                  <div className="flex justify-between mb-3">
                    <h3 className="font-semibold">
                      Question {index + 1}: {question.question}
                    </h3>
                    <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {isCorrect ? '✓' : '✗'} {isCorrect ? question.points : 0} / {question.points} pts
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your answer:{' '}
                      {Array.isArray(userAnswer) ? userAnswer.join(', ') : String(userAnswer)}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Correct answer:{' '}
                        {Array.isArray(question.correctAnswer)
                          ? question.correctAnswer.join(', ')
                          : String(question.correctAnswer)}
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <p className="text-sm font-semibold mb-1">Explanation:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{question.explanation}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={() => {
              setSubmitted(false)
              setAnswers({})
              setScore(0)
            }}
            className="btn-secondary mt-6"
          >
            Try Again
          </button>
        </>
      )}
    </div>
  )
}
