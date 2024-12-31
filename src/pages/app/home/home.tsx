import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'

import { getWorkouts } from '@/api/get-workouts'
import { WorkoutCard } from '@/components/workout-card'
import { WorkoutEmpty } from '@/components/workout-empty'

import HomeHeader from './home-header'

export function Home() {
  const [searchParams] = useSearchParams()

  const workoutCategory = searchParams.get('workoutCategory')

  const { data: result } = useQuery({
    queryKey: ['workouts', workoutCategory],
    queryFn: () =>
      getWorkouts({
        workoutCategory: workoutCategory === 'all' ? null : workoutCategory,
      }),
  })

  return (
    <div className="min-h-screen space-y-8 p-8">
      <Helmet title="Home" />
      <div className="flex flex-col gap-6 border-b-[1px] border-b-primary">
        <h1 className="text-3xl font-bold text-active">Home</h1>
        <HomeHeader />
      </div>

      {result && result.workouts.length > 0 ? (
        <div className="grid grid-cols-2 grid-rows-2 gap-y-8 lg:grid-cols-5">
          {result &&
            result.workouts.map((workout) => {
              return <WorkoutCard key={workout.workoutId} workout={workout} />
            })}
        </div>
      ) : (
        <WorkoutEmpty />
      )}
    </div>
  )
}
