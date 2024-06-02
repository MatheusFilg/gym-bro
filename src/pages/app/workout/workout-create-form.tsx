import { Control, Controller } from 'react-hook-form'
import { z } from 'zod'

import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface WorkoutCreateFormProps {
  control: Control<{
    aerobic: boolean
    workoutCategory: 'upper' | 'lower'
    workoutId: string
  }>
}
const workoutCreateSchema = z.object({
  aerobic: z.boolean(),
  workoutCategory: z.enum(['upper', 'lower']),
  workoutId: z.string(),
})

export type WorkoutCreateSchema = z.infer<typeof workoutCreateSchema>

export function WorkoutCreateForm({ control }: WorkoutCreateFormProps) {
  return (
    <div className="flex flex-row items-center lg:grid lg:grid-cols-form">
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
                <SelectItem className="text-lg font-semibold" value="lower">
                  Treino Inferior
                </SelectItem>
                <SelectItem className="text-lg font-semibold" value="upper">
                  Treino Superior
                </SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <div className="flex w-60 flex-row gap-4 lg:items-center">
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
  )
}
