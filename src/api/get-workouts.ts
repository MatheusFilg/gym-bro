import { api } from '@/lib/axios'

export interface GetWorkoutQuery {
  workoutCategory?: string | null
}

interface GetWorkoutsResponse {
  workouts: {
    id: string
    workoutCategory: 'upper' | 'lower'
    aerobic: boolean
    createdAt: string
  }[]

}

export async function getWorkouts({workoutCategory }: GetWorkoutQuery) {
  const response = await api.get<GetWorkoutsResponse>('/workouts', {
    params: {
      workoutCategory,
    },
  })

  return response.data
}
