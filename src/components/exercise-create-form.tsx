import { UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface ExerciseCreateFormProps {
  register: UseFormRegister<{
    exercise: string
    sets: number
    reps: number
    weight: number
    note: string | null
  }>
}

const exerciseCreateSchema = z.object({
  exercise: z.string(),
  sets: z.number(),
  reps: z.number(),
  weight: z.number(),
  note: z.string().nullable(),
})

export type ExerciseCreateSchema = z.infer<typeof exerciseCreateSchema>

export function ExerciseCreateForm({ register }: ExerciseCreateFormProps) {
  return (
    <div className="flex w-full flex-col gap-2 border-t-[1px] border-border ">
      <h1 className="my-2 self-center text-lg font-semibold lg:text-xl">
        Cadastre seus Exercícios
      </h1>

      <div className="flex flex-row items-center gap-2 lg:gap-4">
        <label className="font-medium lg:text-lg" htmlFor="exercise">
          Exercício
        </label>
        <Input
          className=" h-8 w-fit font-semibold"
          {...register('exercise', { required: true })}
          type="text"
          required
        />
      </div>

      <div className="flex flex-col items-start gap-6 py-3 lg:flex-row lg:items-center lg:py-6">
        <div className="flex flex-row items-center gap-2">
          <label className="font-medium lg:text-lg" htmlFor="sets">
            Séries
          </label>
          <Input
            className="h-8 max-w-[60px] font-semibold"
            type="number"
            {...register('sets', {
              valueAsNumber: true,
              required: true,
            })}
            required
            max={10}
            min={1}
          />
        </div>

        <div className="flex flex-row items-center gap-2">
          <label className="font-medium lg:text-lg" htmlFor="reps">
            Repetições
          </label>
          <Input
            className="h-8 max-w-[60px] items-center font-semibold"
            type="number"
            {...register('reps', {
              valueAsNumber: true,
            })}
            required
            max={50}
            min={1}
          />
        </div>

        <div className="flex flex-row items-center gap-2">
          <label className="font-medium lg:text-lg" htmlFor="weight">
            Carga (kg)
          </label>
          <Input
            className="h-8 max-w-[60px] font-semibold"
            type="number"
            {...register('weight', {
              valueAsNumber: true,
            })}
            required
            max={999}
            min={1}
          />
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <label className="font-medium lg:text-lg" htmlFor="note">
          Observação
        </label>
        <Textarea
          className="h-8 w-2/3 lg:min-w-fit"
          {...register('note')}
          placeholder="Adicione uma observação ao seu exercício (opcional)"
        />
      </div>
    </div>
  )
}
