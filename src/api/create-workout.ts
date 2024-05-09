import { api } from '@/lib/axios'

export interface CreateWorkoutBody {
  aerobic: boolean
  workoutCategory: 'upper' | 'lower'
}

interface CreateWorkoutResponse {
  workout: {
    workoutId: string
    workoutCategory: 'upper' | 'lower'
    aerobic: boolean
  }
}

export async function createWorkout({
  aerobic,
  workoutCategory,
}: CreateWorkoutBody) {
  const response = await api.post<CreateWorkoutResponse>('/workouts', {
    aerobic,
    workoutCategory,
  })

  return response.data
}
