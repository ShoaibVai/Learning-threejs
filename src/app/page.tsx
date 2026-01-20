import { getAllTracks } from '@/lib/content'
import { LandingHero } from '@/components/home/LandingHero'
import { TrackList } from '@/components/home/TrackList'

export default async function HomePage() {
  const tracks = await getAllTracks()

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHero />
      <TrackList tracks={tracks} />
    </div>
  )
}
