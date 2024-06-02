import { UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface WorkoutUpdateFormProps {
  register: UseFormRegister<{
    exercise: string
    sets: number
    reps: number
    weight: number
    note: string | null
  }>
}

const workoutUpdateSchema = z.object({
  exercise: z.string(),
  sets: z.number(),
  reps: z.number(),
  weight: z.number(),
  note: z.string().nullable(),
})

export type WorkoutUpdateSchema = z.infer<typeof workoutUpdateSchema>

export function WorkoutUpdateForm({ register }: WorkoutUpdateFormProps) {
  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex flex-row items-center gap-4">
        <label className="text-base font-medium" htmlFor="exercise">
          Exercício
        </label>
        <Input
          className="h-10 w-[280px] text-lg font-semibold"
          {...register('exercise', { required: true })}
          type="text"
          required
        />
      </div>

      <div className="flex flex-row items-center gap-6 py-6">
        <div className="flex flex-row items-center gap-2">
          <label className="text-base font-medium" htmlFor="sets">
            Séries
          </label>
          <Input
            className="h-10 max-w-[60px] text-lg font-semibold"
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
          <label className="text-base font-medium" htmlFor="reps">
            Repetições
          </label>
          <Input
            className="h-10 max-w-[60px] items-center text-lg font-semibold"
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
          <label className="text-base font-medium" htmlFor="weight">
            Carga(kg)
          </label>
          <Input
            className="h-10 max-w-[70px] items-center text-lg font-semibold"
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

      {/* <div className="flex flex-row items-center gap-2"></div>

      <div className="flex flex-row items-center gap-2"></div> */}

      <div className="flex flex-row items-center gap-2">
        <label className="text-base font-medium" htmlFor="note">
          Observação
        </label>
        <Textarea
          className="h-8 w-[280px]"
          {...register('note')}
          placeholder="Adicione uma observação ao seu exercício (opcional)"
        />
      </div>
    </div>
  )
}
