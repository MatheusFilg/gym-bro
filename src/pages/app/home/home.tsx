import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'

import { getWorkouts } from '@/api/get-workouts'
import { WorktoutCard } from '@/components/workout-card'

import { HomeFilter } from './home-filter'

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const workoutCategory = searchParams.get('workoutCategory')

  const { data: result } = useQuery({
    queryKey: ['workouts', workoutCategory, ],
    queryFn: () =>
      getWorkouts({
        workoutCategory: workoutCategory === 'all' ? null : workoutCategory,
      }),
  })

  return (
    <div className="space-y-8 p-8">
      <Helmet title="Home" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-active">Home</h1>

        <HomeFilter />
      </div>

      <div className="grid grid-cols-4 grid-rows-2 gap-y-8">
        {result &&
          result.workouts.map((workout) => {
            return <WorktoutCard key={workout.id} workout={workout} />
          })}
      </div>
    </div>
  )
}
