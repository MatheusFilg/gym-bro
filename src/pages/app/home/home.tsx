import { Helmet } from 'react-helmet-async'

import { WorktoutCard } from '@/components/workout-card'

import { HomeFilter } from './home-filter'

export function Home() {
  return (
    <div className="space-y-12 p-8">
      <Helmet title="Home" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-active">Home</h1>

        <HomeFilter />
      </div>

      <div className="grid grid-cols-4 grid-rows-2 gap-y-8">
        <WorktoutCard />
        <WorktoutCard />
        <WorktoutCard />
        <WorktoutCard />
        <WorktoutCard />
        <WorktoutCard />
      </div>
    </div>
  )
}
