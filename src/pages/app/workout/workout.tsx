import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createWorkout } from '@/api/create-workout'
import { getWorkoutDetails } from '@/api/get-workout-details'
import { updateWorkout } from '@/api/update-workout'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { WorkoutCreateForm, WorkoutCreateSchema } from './workout-create-form'
import { WorkoutUpdateForm, WorkoutUpdateSchema } from './workout-update-form'

export function Workout() {
  const [workoutId, setWorkoutId] = useState('')

  const { data: newExercise } = useQuery({
    queryKey: ['workout', workoutId],
    queryFn: () => getWorkoutDetails({ workoutId }),
  })

  const queryClient = useQueryClient()

  const {
    reset: resetCreateWorkout,
    handleSubmit: handleSubmitCreateWorkout,
    control: createWorkoutControl,
    formState: createWorkoutFormState,
  } = useForm<WorkoutCreateSchema>()

  const {
    reset: resetUpdateWorkout,
    handleSubmit: handleSubmitUpdateWorkout,
    register: registerUpdateWorkout,
    formState: updateWorkoutFormState,
  } = useForm<WorkoutUpdateSchema>()

  const { mutateAsync: createWorkoutFn } = useMutation({
    mutationFn: createWorkout,
  })

  const { mutateAsync: updateWorkoutFn } = useMutation({
    mutationFn: ({ exercise, sets, reps, weight, note }: WorkoutUpdateSchema) =>
      updateWorkout({ exercise, sets, reps, weight, note, workoutId }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['workout'] })
    },
  })

  useEffect(() => {
    if (createWorkoutFormState.isSubmitSuccessful) {
      resetCreateWorkout({
        workoutCategory: undefined,
        aerobic: false,
      })
    }

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

  async function handleCreateWorkout(data: WorkoutCreateSchema) {
    try {
      const response = await createWorkoutFn({
        aerobic: data.aerobic,
        workoutCategory: data.workoutCategory,
      })

      const { workoutId } = response.workout
      setWorkoutId(workoutId)
      toast.success('Treino registrado com sucesso.')
    } catch {
      toast.error('Erro ao registrar treino.')
    }
  }

  async function handleUpdateWorkout({
    exercise,
    note,
    reps,
    sets,
    weight,
  }: WorkoutUpdateSchema) {
    try {
      await updateWorkoutFn({ exercise, note, sets, reps, weight })
      toast.success('Exercício registrado com sucesso.')
    } catch {
      toast.error('Erro ao registrar exercício.')
    }
  }

  return (
    <div className="space-y-8 p-8">
      <Helmet title="Treinos" />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-active">
          Registre o seu Treino
        </h1>
        <form
          onSubmit={handleSubmitCreateWorkout(handleCreateWorkout)}
          className="mt-6 flex w-full flex-row gap-2 border-b-[1px] border-b-primary pb-4"
        >
          <WorkoutCreateForm control={createWorkoutControl} />
          <div className="flex-col">
            <Button type="submit">Criar Treino</Button>
          </div>
        </form>
        <h1 className="mt-6 text-3xl font-bold text-active">
          Cadastre os Exercícios
        </h1>
        <form
          onSubmit={handleSubmitUpdateWorkout(handleUpdateWorkout)}
          className="mt-2 grid grid-flow-row grid-cols-2"
        >
          <div>
            <WorkoutUpdateForm register={registerUpdateWorkout} />
            <div className="flex-col pt-5">
              <Button type="submit">Criar Exercício</Button>
            </div>
          </div>

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

            {newExercise &&
              newExercise.exercises.map((exercise) => {
                return (
                  <TableBody key={exercise.exercise}>
                    <TableRow>
                      <TableCell>{exercise.exercise}</TableCell>
                      <TableCell className="text-right truncate max-w-6">
                        {exercise.note}
                      </TableCell>
                      <TableCell className="text-right">
                        {exercise.sets}
                      </TableCell>
                      <TableCell className="text-right">
                        {exercise.reps}
                      </TableCell>
                      <TableCell className="text-right">
                        {exercise.weight}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )
              })}
          </Table>
        </form>
      </div>
    </div>
  )
}
