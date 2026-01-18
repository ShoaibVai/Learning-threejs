import fs from 'fs'
import path from 'path'
import type { Track, Module, Lesson } from '@/types'

const contentDir = path.join(process.cwd(), 'content')

export async function getAllTracks(): Promise<Track[]> {
  const tracksFile = path.join(contentDir, 'tracks.json')
  const tracksData = JSON.parse(fs.readFileSync(tracksFile, 'utf-8'))
  
  const tracks: Track[] = []
  
  for (const trackInfo of tracksData.tracks) {
    const modules = await getModulesForTrack(trackInfo.id)
    tracks.push({
      ...trackInfo,
      modules,
    })
  }
  
  return tracks
}

export async function getTrack(trackId: string): Promise<Track | null> {
  const tracks = await getAllTracks()
  return tracks.find((t) => t.id === trackId) || null
}

export async function getModulesForTrack(trackId: string): Promise<Module[]> {
  const modulesFile = path.join(contentDir, trackId, 'modules.json')
  
  if (!fs.existsSync(modulesFile)) {
    return []
  }
  
  const modulesData = JSON.parse(fs.readFileSync(modulesFile, 'utf-8'))
  const modules: Module[] = []
  
  for (const moduleInfo of modulesData.modules) {
    const lessons = await getLessonsForModule(trackId, moduleInfo.id)
    modules.push({
      ...moduleInfo,
      lessons,
    })
  }
  
  return modules.sort((a, b) => a.order - b.order)
}

export async function getModule(
  trackId: string,
  moduleId: string
): Promise<Module | null> {
  const modules = await getModulesForTrack(trackId)
  return modules.find((m) => m.id === moduleId) || null
}

export async function getLessonsForModule(
  trackId: string,
  moduleId: string
): Promise<Lesson[]> {
  const moduleDir = path.join(contentDir, trackId, moduleId)
  
  if (!fs.existsSync(moduleDir)) {
    return []
  }
  
  const files = fs.readdirSync(moduleDir).filter((f: string) => f.endsWith('.json'))
  const lessons: Lesson[] = []
  
  for (const file of files) {
    const lessonFile = path.join(moduleDir, file)
    const lessonData = JSON.parse(fs.readFileSync(lessonFile, 'utf-8'))
    lessons.push(lessonData)
  }
  
  return lessons.sort((a, b) => a.order - b.order)
}

export async function getLesson(
  trackId: string,
  moduleId: string,
  lessonId: string
): Promise<Lesson | null> {
  const lessons = await getLessonsForModule(trackId, moduleId)
  return lessons.find((l) => l.id === lessonId) || null
}

export async function getAllLessons(): Promise<
  Array<{ lesson: Lesson; trackId: string; moduleId: string }>
> {
  const tracks = await getAllTracks()
  const allLessons: Array<{ lesson: Lesson; trackId: string; moduleId: string }> = []
  
  for (const track of tracks) {
    for (const module of track.modules) {
      for (const lesson of module.lessons) {
        allLessons.push({
          lesson,
          trackId: track.id,
          moduleId: module.id,
        })
      }
    }
  }
  
  return allLessons
}

export function getLessonPath(trackId: string, moduleId: string, lessonId: string): string {
  return `/tracks/${trackId}/modules/${moduleId}/lessons/${lessonId}`
}

export async function getNextLesson(
  trackId: string,
  moduleId: string,
  lessonId: string
): Promise<{ lesson: Lesson; moduleId: string } | null> {
  const track = await getTrack(trackId)
  if (!track) return null
  
  let foundCurrent = false
  
  for (const module of track.modules) {
    for (const lesson of module.lessons) {
      if (foundCurrent) {
        return { lesson, moduleId: module.id }
      }
      if (lesson.id === lessonId) {
        foundCurrent = true
      }
    }
  }
  
  return null
}

export async function getPreviousLesson(
  trackId: string,
  moduleId: string,
  lessonId: string
): Promise<{ lesson: Lesson; moduleId: string } | null> {
  const track = await getTrack(trackId)
  if (!track) return null
  
  let previous: { lesson: Lesson; moduleId: string } | null = null
  
  for (const module of track.modules) {
    for (const lesson of module.lessons) {
      if (lesson.id === lessonId) {
        return previous
      }
      previous = { lesson, moduleId: module.id }
    }
  }
  
  return null
}
