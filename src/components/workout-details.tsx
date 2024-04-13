import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Check, X } from 'lucide-react'

import { deleteWorkout } from '@/api/delete-workout'
import { getWorkoutDetails } from '@/api/get-workout-details'
import { GetWorkoutsResponse } from '@/api/get-workouts'

import { Button } from './ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export interface WorkoutDetailsProps {
  workoutId: string
  open: boolean
}

export function WorkoutDetails({ workoutId, open }: WorkoutDetailsProps) {
  const { data: workout } = useQuery({
    queryKey: ['workout', workoutId],
    queryFn: () => getWorkoutDetails({ workoutId }),
    enabled: open,
  })

  const queryClient = useQueryClient()

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
          (workout) => workout.id !== workoutId,
        ),
      })
    })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{workoutId}</DialogTitle>
        <DialogDescription>Detalhes do Treino</DialogDescription>
      </DialogHeader>

      {workout && (
        <div className="space-y-4">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Tipo do Treino
                </TableCell>
                <TableCell className="flex justify-end text-base font-medium">
                  {workout.workoutCategory === 'upper'
                    ? 'Treino Superior'
                    : 'Treino Inferior'}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Aérobico
                </TableCell>
                <TableCell className="flex justify-end text-base font-medium">
                  {workout.aerobic ? (
                    <Check className="ml-1 h-6 w-6" />
                  ) : (
                    <X className="ml-1 h-6 w-6" />
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado em:
                </TableCell>
                <TableCell className="flex justify-end text-base font-medium">
                  {format(workout.createdAt, 'dd/MM/yyyy')}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Treino</TableHead>
                <TableHead className="text-right">Observação</TableHead>
                <TableHead className="text-right">Séries</TableHead>
                <TableHead className="text-right">Repetições</TableHead>
                <TableHead className="text-right">Carga(kg)</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>Mobilidade</TableCell>
                <TableCell className="text-right">-</TableCell>
                <TableCell className="text-right">2</TableCell>
                <TableCell className="text-right">12</TableCell>
                <TableCell className="text-right">-</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Mesa Flexora</TableCell>
                <TableCell className="text-right">Unilateral</TableCell>
                <TableCell className="text-right">3</TableCell>
                <TableCell className="text-right">12</TableCell>
                <TableCell className="text-right">30</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="">Agachamento Stiff</TableCell>
                <TableCell className="text-right">Dropdown</TableCell>
                <TableCell className="text-right">3</TableCell>
                <TableCell className="text-right">1</TableCell>
                <TableCell className="text-right">30</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Adutor</TableCell>
                <TableCell className="text-right">Progressão</TableCell>
                <TableCell className="text-right">3</TableCell>
                <TableCell className="text-right">12</TableCell>
                <TableCell className="text-right">50</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-center gap-2 align-middle">
            <Button
              variant="default"
              onClick={() => deleteWorkoutFn({ workoutId: workout.id })}
            >
              Deletar Treino
            </Button>
          </div>
        </div>
      )}
    </DialogContent>
  )
}
