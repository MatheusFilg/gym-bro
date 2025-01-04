import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Check, X } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getWorkoutDetails } from '@/api/get-workout-details'
import { updateWorkout } from '@/api/update-workout'
import {
  ExerciseCreateForm,
  ExerciseCreateSchema,
} from '@/components/exercise-create-form'

import ExerciseTable from './exercise-table'
import { Button } from './ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Table, TableBody, TableCell, TableRow } from './ui/table'

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

  const {
    reset: resetUpdateWorkout,
    handleSubmit: handleSubmitUpdateWorkout,
    register: registerUpdateWorkout,
    formState: updateWorkoutFormState,
  } = useForm<ExerciseCreateSchema>()

  const { mutateAsync: updateWorkoutFn } = useMutation({
    mutationFn: ({
      exercise,
      sets,
      reps,
      weight,
      note,
    }: ExerciseCreateSchema) =>
      updateWorkout({ exercise, sets, reps, weight, note, workoutId }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['workout'] })
    },
  })

  async function handleUpdateWorkout({
    exercise,
    note,
    reps,
    sets,
    weight,
  }: ExerciseCreateSchema) {
    try {
      await updateWorkoutFn({ exercise, note, sets, reps, weight })
      toast.success('Exercício registrado com sucesso.')
    } catch {
      toast.error('Erro ao registrar exercício.')
    }
  }

  useEffect(() => {
    if (updateWorkoutFormState.isSubmitSuccessful) {
      resetUpdateWorkout({
        exercise: '',
        sets: 0,
        weight: 0,
        reps: 0,
        note: '',
      })
    }
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{workoutId}</DialogTitle>
        <DialogDescription>Detalhes do Treino</DialogDescription>
      </DialogHeader>

      {workout && (
        <div className="w-[85%] lg:w-full lg:space-y-3">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Tipo do Treino
                </TableCell>
                <TableCell className="text-base font-medium lg:flex lg:justify-end">
                  {workout.workoutCategory === 'upper'
                    ? 'Treino Superior'
                    : 'Treino Inferior'}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Aeróbico
                </TableCell>
                <TableCell className="text-base font-medium lg:flex lg:justify-end">
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
                <TableCell className="text-base font-medium lg:flex lg:justify-end">
                  {format(workout.createdAt, 'dd/MM/yyyy')}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <form
            onSubmit={handleSubmitUpdateWorkout(handleUpdateWorkout)}
            className="flex flex-col items-center gap-4"
          >
            <ExerciseCreateForm register={registerUpdateWorkout} />
            <ExerciseTable workout={workout} />
            <Button type="submit">Criar Exercício</Button>
          </form>
        </div>
      )}
    </DialogContent>
  )
}
