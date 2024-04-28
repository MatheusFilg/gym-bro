import { api } from '@/lib/axios'

export interface CreateWorkoutBody {
  aerobic: boolean
  workoutCategory: 'upper' | 'lower' | undefined
}

export async function createWorkout({
  aerobic,
  workoutCategory,
}: CreateWorkoutBody) {
  await api.post('/workouts', { aerobic, workoutCategory })
}
