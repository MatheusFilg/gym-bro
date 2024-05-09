import { api } from '@/lib/axios'

interface GetWorkoutDetailsParams {
  workoutId: string
}

interface GetWorkoutDetailsResponse {
  workoutId: string
  workoutCategory: 'upper' | 'lower'
  aerobic: boolean
  createdAt: string
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
