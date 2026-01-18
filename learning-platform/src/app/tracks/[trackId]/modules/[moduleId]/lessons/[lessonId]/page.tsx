import { notFound } from 'next/navigation'
import { getLesson, getTrack, getModule, getNextLesson, getPreviousLesson } from '@/lib/content'
import LessonViewer from '@/components/LessonViewer'

export default async function LessonPage({
  params,
}: {
  params: { trackId: string; moduleId: string; lessonId: string }
}) {
  const [lesson, track, module] = await Promise.all([
    getLesson(params.trackId, params.moduleId, params.lessonId),
    getTrack(params.trackId),
    getModule(params.trackId, params.moduleId),
  ])

  if (!lesson || !track || !module) {
    notFound()
  }

  const [nextLesson, previousLesson] = await Promise.all([
    getNextLesson(params.trackId, params.moduleId, params.lessonId),
    getPreviousLesson(params.trackId, params.moduleId, params.lessonId),
  ])

  return (
    <LessonViewer
      lesson={lesson}
      track={track}
      module={module}
      trackId={params.trackId}
      moduleId={params.moduleId}
      nextLesson={nextLesson}
      previousLesson={previousLesson}
    />
  )
}
