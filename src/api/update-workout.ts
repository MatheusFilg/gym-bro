import { api } from '@/lib/axios'

export interface UpdateWorkoutBody {
  exercise: string
  sets: number
  reps: number
  weight: number
  note: string | null
}

interface UpdateWorkoutParams {
  workoutId: string
  exercise: string
  sets: number
  reps: number
  weight: number
  note: string | null
}

interface UpdateWorkoutResponse {
  data: {
    id: number
    exercise: string
    sets: number
    reps: number
    weight: number
    note: string | null
  }
}
export async function updateWorkout({
  workoutId,
  exercise,
  sets,
  reps,
  weight,
  note,
}: UpdateWorkoutParams) {
  const response = await api.put<UpdateWorkoutResponse>(
    `/workouts/${workoutId}/exercises`,
    {
      exercise,
      sets,
      reps,
      weight,
      note,
    },
  )

  return response.data
}
