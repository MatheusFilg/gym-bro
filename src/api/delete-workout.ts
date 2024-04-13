import { api } from '@/lib/axios'

export interface DeleteWorkoutParams {
  workoutId: string
}

export async function deleteWorkout({ workoutId }: DeleteWorkoutParams) {
  await api.delete<DeleteWorkoutParams>(`/workouts/${workoutId}`)
}
