import { api } from '@/lib/axios'

interface GetWorkoutDetailsParams {
  workoutId: string
}

interface GetWorkoutDetailsResponse {
  workoutId: string
  workoutCategory: 'upper' | 'lower'
  aerobic: boolean
  createdAt: string
  exercises: {
    exercise: string
    sets: number
    reps: number
    weight: number
    note: string | null
  }[]
}

export async function getWorkoutDetails({
  workoutId,
}: GetWorkoutDetailsParams) {
  const response = await api.get<GetWorkoutDetailsResponse>(
    `/workouts/${workoutId}`,
    {
      params: {
        workoutId,
      },
    },
  )
  return response.data
}
