import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createWorkout } from '@/api/create-workout'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogContent } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Caso seja necessario que esse componente receba os valores do control de um outro componente, usar essa interface:

// interface WorkoutCreateFormProps {
//   control: Control<{
//     aerobic: boolean
//     workoutCategory: 'upper' | 'lower'
//     workoutId: string
//   }>
// }

const workoutCreateSchema = z.object({
  aerobic: z.boolean(),
  workoutCategory: z.enum(['upper', 'lower']),
  workoutId: z.string(),
})

export type WorkoutCreateSchema = z.infer<typeof workoutCreateSchema>

export function WorkoutCreateForm() {
  const queryClient = useQueryClient()

  const { mutateAsync: createWorkoutFn } = useMutation({
    mutationFn: createWorkout,
  })

  const {
    reset: resetCreateWorkout,
    handleSubmit: handleSubmitCreateWorkout,
    control: createWorkoutControl,
    formState: createWorkoutFormState,
  } = useForm<WorkoutCreateSchema>()

  async function handleCreateWorkout(data: WorkoutCreateSchema) {
    try {
      await createWorkoutFn({
        aerobic: data.aerobic,
        workoutCategory: data.workoutCategory,
      })
      toast.success('Treino registrado com sucesso.')
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
    } catch {
      toast.error('Erro ao registrar treino.')
    }
  }

  useEffect(() => {
    if (createWorkoutFormState.isSubmitSuccessful) {
      resetCreateWorkout({
        workoutCategory: undefined,
        aerobic: false,
      })
    }
  })

  return (
    <DialogContent>
      <form
        onSubmit={handleSubmitCreateWorkout(handleCreateWorkout)}
        className="m-6 flex flex-col items-center gap-6 align-middle"
      >
        <div className="flex flex-row items-center align-middle">
          {/* Select Component */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="workoutCategory"
              className="w-max text-base font-medium"
            >
              Tipo de Treino
            </label>

            <Controller
              name="workoutCategory"
              control={createWorkoutControl}
              render={({ field: { name, onChange, value } }) => {
                return (
                  <Select name={name} onValueChange={onChange} value={value}>
                    <SelectTrigger className="h-8 w-[280px] text-sm font-semibold">
                      {value ? (
                        <SelectValue />
                      ) : (
                        <span className="text-sm">Escolha um Treino</span>
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="text-sm font-semibold"
                        value="lower"
                      >
                        Treino Inferior
                      </SelectItem>
                      <SelectItem
                        className="text-sm font-semibold"
                        value="upper"
                      >
                        Treino Superior
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )
              }}
            />
          </div>

          {/* Checkbox component */}
          <div className="flex flex-col gap-2 lg:items-center">
            <label htmlFor="aerobic" className="w-max text-base font-medium">
              Aeróbico
            </label>

            <Controller
              name="aerobic"
              defaultValue={false}
              control={createWorkoutControl}
              render={({ field: { name, onChange, value } }) => {
                return (
                  <Checkbox
                    name={name}
                    checked={value}
                    onCheckedChange={onChange}
                    id="aerobic"
                  />
                )
              }}
            />
          </div>
        </div>
        <Button type="submit" className="flex w-2/4 self-center">
          Criar Treino
        </Button>
      </form>
    </DialogContent>
  )
}
