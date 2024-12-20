import { useMutation } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Check, Search, Trash, X } from 'lucide-react'
import { useState } from 'react'

import { deleteWorkout } from '@/api/delete-workout'
import { GetWorkoutsResponse } from '@/api/get-workouts'
import { queryClient } from '@/lib/react-query'

import lowerWorkout from '../assets/lowerWorkout.png'
import upperWorkout from '../assets/upperWorkout.png'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import { WorkoutDetails } from './workout-details'

interface WorkoutCardProps {
  workout: {
    workoutId: string
    workoutCategory: 'upper' | 'lower'
    aerobic: boolean
    createdAt: string
  }
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const [isDetailOpen, setIsDetailsOpen] = useState(false)

  const { mutateAsync: deleteWorkoutFn } = useMutation({
    mutationFn: deleteWorkout,
    async onSuccess(_, { workoutId }) {
      deleteWorkoutOnCache(workoutId)
    },
  })

  function deleteWorkoutOnCache(workoutId: string) {
    const workoutsListCache = queryClient.getQueriesData<GetWorkoutsResponse>({
      queryKey: ['workouts'],
    })

    workoutsListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetWorkoutsResponse>(cacheKey, {
        ...cacheData,
        workouts: cacheData.workouts.filter(
          (workout) => workout.workoutId !== workoutId,
        ),
      })
    })
  }
  return (
    <div className="flex w-[200px] flex-col items-center space-y-4 rounded bg-primary py-4 align-middle">
      <img
        className="h-14 w-14"
        src={workout.workoutCategory === 'upper' ? upperWorkout : lowerWorkout}
        alt=""
      />
      <h1 className="text-lg font-semibold">
        {workout.workoutCategory === 'upper'
          ? 'Treino Superior'
          : 'Treino Inferior'}
      </h1>
      <div className="flex flex-row items-center font-medium">
        Aeróbico
        {workout.aerobic ? (
          <Check className="ml-1 h-6 w-6" />
        ) : (
          <X className="ml-1 h-6 w-6" />
        )}
      </div>

      <div className="flex flex-row items-center gap-2">
        <span className="text-sm font-medium">
          {formatDistanceToNow(workout.createdAt, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>

        <Dialog open={isDetailOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-6 p-2">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do Treino</span>
            </Button>
          </DialogTrigger>
          <WorkoutDetails workoutId={workout.workoutId} open={isDetailOpen} />
        </Dialog>

        <Button
          variant="outline"
          className="h-6 p-2"
          onClick={() => deleteWorkoutFn({ workoutId: workout.workoutId })}
        >
          <Trash className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
