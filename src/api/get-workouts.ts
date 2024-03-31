import { api } from '@/lib/axios'

export interface GetWorkoutQuery {
  pageIndex?: number | null
  workout_category?: string | null
}

interface GetWorkoutsResponse {
  workouts: {
    id: string
    workout_category: 'upper' | 'lower'
    aerobic: boolean
    created_at: string
  }[]
}

export async function getWorkouts({ pageIndex, workout_category }: GetWorkoutQuery) {
  const response = await api.get<GetWorkoutsResponse>('/workouts', {
    params: {
      pageIndex,
      workout_category,
    },
  })

  return response.data
}
