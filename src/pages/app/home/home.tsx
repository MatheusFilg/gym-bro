import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getWorkouts } from '@/api/get-workouts'
import { Pagination } from '@/components/pagination'
import { WorktoutCard } from '@/components/workout-card'

import { HomeFilter } from './home-filter'

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const workout_category = searchParams.get('workout_category')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['workouts', workout_category, pageIndex],
    queryFn: () =>
      getWorkouts({
        pageIndex,
        workout_category: workout_category === 'all' ? null : workout_category,
      }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())

      return state
    })
  }

  console.log(result)
  console.log(result?.workouts)
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
      <Pagination
        onPageChange={handlePaginate}
        pageIndex={0}
        totalCount={32}
        perPage={8}
      />
    </div>
  )
}
