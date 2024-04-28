import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { createWorkout } from '@/api/create-workout'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const workoutForm = z.object({
  aerobic: z.boolean(),
  workoutCategory: z.enum(['upper', 'lower']).optional(),
})

type WorkoutForm = z.infer<typeof workoutForm>

export function Workout() {
  const { reset, handleSubmit, control, formState } = useForm<WorkoutForm>()

  const { mutateAsync: createWorkoutFn } = useMutation({
    mutationFn: createWorkout,
  })

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        workoutCategory: undefined,
        aerobic: false,
      })
    }
  })

  async function handleCreateWorkout(data: WorkoutForm) {
    try {
      await createWorkoutFn({
        aerobic: data.aerobic,
        workoutCategory: data.workoutCategory,
      })
    } catch {
      console.log(data)
    }
  }

  return (
    <div className="space-y-8 p-8">
      <Helmet title="Treinos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-active">
          Registre o seu Treino
        </h1>
        <form
          onSubmit={handleSubmit(handleCreateWorkout)}
          className="mt-6 flex w-full flex-col gap-4 divide-y"
        >
          <div className="flex flex-row items-center gap-2 lg:grid lg:grid-cols-form">
            <label
              htmlFor="workoutCategory"
              className="grid-cols-0.5 w-max text-base font-medium"
            >
              Tipo de Treino
            </label>

            <Controller
              name="workoutCategory"
              control={control}
              render={({ field: { name, onChange, value } }) => {
                return (
                  <Select name={name} onValueChange={onChange} value={value}>
                    <SelectTrigger className="h-10 w-[280px] text-lg font-semibold">
                      {value ? <SelectValue /> : 'Escolha um Treino'}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="text-lg font-semibold"
                        value="lower"
                      >
                        Treino Inferior
                      </SelectItem>
                      <SelectItem
                        className="text-lg font-semibold"
                        value="upper"
                      >
                        Treino Superior
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )
              }}
            />

            <div className="flex flex-row lg:grid lg:grid-cols-form lg:items-center">
              <label htmlFor="aerobic" className="w-max text-base font-medium">
                Aérobico
              </label>
              <Controller
                name="aerobic"
                defaultValue={false}
                control={control}
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

          <div className="flex-col pt-5">
            <Button type="submit">Criar Treino</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
