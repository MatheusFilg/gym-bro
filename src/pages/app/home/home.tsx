import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const workoutFilterSchema = z.object({
  aerobic: z.boolean().optional(),
  workout: z.string().optional(),
})

type WorkoutFilterSchema = z.infer<typeof workoutFilterSchema>
export function Home() {
  const { control } = useForm<WorkoutFilterSchema>({
    resolver: zodResolver(workoutFilterSchema),
    defaultValues: {
      workout: 'all',
    },
  })

  return (
    <div className="space-y-6 p-8">
      <Helmet title="Home" />
      <h1 className="text-3xl font-bold text-active">Home</h1>

      <form className="flex flex-row items-center space-x-4">
        <span className="text-base font-semibold">Filtros</span>

        <Controller
          name="workout"
          control={control}
          render={({ field: { name, onChange, value, disabled } }) => {
            return (
              <Select
                defaultValue="all"
                name={name}
                value={value}
                onValueChange={onChange}
                disabled={disabled}
              >
                <SelectTrigger className="h-8 w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="lower">Treino Inferior</SelectItem>
                  <SelectItem value="upper">Treino Superior</SelectItem>
                </SelectContent>
              </Select>
            )
          }}
        />
      </form>
    </div>
  )
}
